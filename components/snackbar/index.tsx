import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, SafeAreaView, StatusBar, Alert } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Snackbar } from "react-native-paper";
import FooterButton from "../../components/footerButton";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import RazorpayCheckout from 'react-native-razorpay';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'SelectSeats'>;

const seatTypes = [
  { id: "1", name: "Silver Class", price: 400, available: 8 },
  { id: "2", name: "Gold Class", price: 800, available: 5 },
  { id: "3", name: "Platinum Class", price: 1480, available: 3 },
];

const SelectSeats = () => {
  const navigation = useNavigation<EventsNavigationProp>();
  const [selectedSeats, setSelectedSeats] = useState<Record<string, number>>({});
  const [seat, setSeat] = useState("");
  const [filter, setFilter] = useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const onBack = () => {
    if (seat) {
      setSeat("");
    } else {
      navigation.goBack();
    }
  };

  const onFilter = (value: string) => {
    setFilter(value === filter ? "" : value);
  };

  const onSortingBySelection = () => {
    return seatTypes.sort((a, b) => (a.name === seat ? -1 : b.name === seat ? 1 : 0));
  };

  const handleSeatChange = (id: string, action: "increase" | "decrease") => {
    setSelectedSeats((prev) => {
      const currentCount = prev[id] || 0;
      const seat = seatTypes.find((s) => s.id === id);
      if (!seat) return prev;

      if (action === "increase" && currentCount < seat.available) {
        return { ...prev, [id]: currentCount + 1 };
      }
      if (action === "decrease" && currentCount > 0) {
        return { ...prev, [id]: currentCount - 1 };
      }
      return prev;
    });
  };

  const totalPrice = Object.entries(selectedSeats).reduce(
    (total, [id, count]) => {
      const seat = seatTypes.find((s) => s.id === id);
      return seat ? total + count * seat.price : total;
    },
    0
  );

  const totalTickets = Object.values(selectedSeats).reduce((total, count) => total + count, 0);

  const razorPay = () => {
    const options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_PGHaZvQiXPNb2g',
      amount: totalPrice * 100,
      name: 'Acme Corp',
      order_id: '',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: { color: '#7E2CCF' },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        navigation.navigate("OrderConfirmation");
      })
      .catch((error) => {
        if (error.code === 'Payment Cancelled') {
          showSnackbar('Payment was cancelled by the user.');
        } else {
          showSnackbar(`Error: ${error.description}`);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Seats</Text>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {seat ? (
          <View>
            {onSortingBySelection().map((item) => (
              <View key={item.id}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginHorizontal: 20, marginVertical: 10 }}>
                  <MaterialCommunityIcons name="ticket-confirmation" size={20} color={item.name === "Gold Class" ? "#FAC38C" : item.name === "Silver Class" ? "#EAEAEA" : "#ABAAD5"} />
                  <Text style={styles.seatText}>{item.name}</Text>
                </View>
                <View style={[styles.seatRow, { marginHorizontal: 20, borderRadius: 5, elevation: 1 }]}>
                  <View>
                    <Text style={{ fontSize: 12, color: "black" }}>Each tickets carry single entry</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text style={{ fontSize: 16, }}>₹ {item.price}</Text>
                      <Text style={styles.seatAvailability}>{item.available} seats left</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: "#7A7A7A" }}>+199 tax & fees</Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      onPress={() => handleSeatChange(item.id, "decrease")}
                      style={[styles.counterButton, { borderWidth: 1, borderColor: selectedSeats[item.id] ? "#7E2CCF" : "#D9D9D9" }]}
                    >
                      <MaterialIcons name="remove" size={20} color={selectedSeats[item.id] ? "#7E2CCF" : "#D9D9D9"} />
                    </TouchableOpacity>
                    <Text style={styles.count}>{selectedSeats[item.id] || 0}</Text>
                    <TouchableOpacity
                      onPress={() => handleSeatChange(item.id, "increase")} disabled={(selectedSeats[item.id] || 0) >= item.available}
                      style={[styles.counterButton, { borderWidth: 1, borderColor: (selectedSeats[item.id] || 0) < item.available ? "#7E2CCF" : "#D9D9D9" }]}
                    >
                      <MaterialIcons name="add" size={20} color={(selectedSeats[item.id] || 0) < item.available ? "#7E2CCF" : "#D9D9D9"} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <View style={styles.filter}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialCommunityIcons name="filter-variant" size={20} />
                <Text>Filter stands by</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "flex-start", gap: 10, marginTop: 10 }}>
                {seatTypes.map((item) => (
                  <TouchableOpacity key={item.id} onPress={() => onFilter(item.name)}>
                    <Text style={filter === item.name ? styles.filtered : styles.unFiltered}>{"₹"} {item.price}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.stageLayout}>
              <View style={[styles.stage, styles.row2]}>
                <View style={styles.stageContainer}>
                  <Text style={styles.stageText}>Stage</Text>
                </View>
              </View>
              <TouchableOpacity disabled={filter === "" ? false : filter !== "" && filter !== "Platinum Class"} style={[styles.platinumClass, styles.row1, { backgroundColor: filter === "" ? "#EDC7F7" : filter !== "" && filter === "Platinum Class" ? "#EDC7F7" : "#E5E3D4" }]} onPress={() => { setSeat("Platinum Class"), handleSeatChange("3", "increase") }}>
                <Text style={styles.classText}>Platinum</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={filter === "" ? false : filter !== "" && filter !== "Gold Class"} style={[styles.goldClass, styles.row2, { backgroundColor: filter === "" ? "#FFC573" : filter !== "" && filter === "Gold Class" ? "#FFC573" : "#E5E3D4" }]} onPress={() => { setSeat("Gold Class"), handleSeatChange("2", "increase") }}>
                <Text style={styles.classText}>Gold</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={filter === "" ? false : filter !== "" && filter !== "Silver Class"} style={[styles.silverClass, styles.row3, { backgroundColor: filter === "" ? "#D3E5A5" : filter !== "" && filter === "Silver Class" ? "#D3E5A5" : "#E5E3D4" }]} onPress={() => { setSeat("Silver Class"), handleSeatChange("1", "increase") }}>
                <Text style={styles.classText}>Silver</Text>
              </TouchableOpacity>
            </View>

            <Text style={{ color: "#7A7A7A", textAlign: "center", marginBottom: 16 }}>Seats Layout</Text>

            <View style={styles.contentContainer}>
              <Text style={styles.sectionTitle}>Note</Text>
              <Text style={styles.rulesText}>• Silver, Gold, and Platinum seats offer different viewing experiences. Please review the seating chart carefully before making your selection.</Text>
              <Text style={styles.rulesText}>• Silver seats are located in the general admission area.</Text>
              <Text style={styles.rulesText}>• Gold seats provide a better view and are closer to the stage.</Text>
              <Text style={styles.rulesText}>• Platinum seats offer the best view and are located in the premium section.</Text>
              <Text style={styles.rulesText}>• Seat selection is on a first-come, first-served basis. Once selected, seats cannot be changed.</Text>
              <Text style={styles.rulesText}>• Ensure all members of your party arrive at the venue on time to avoid seat reallocation.</Text>
            </View>

            <View style={styles.bottomPadding} />
          </View>
        )}
      </ScrollView>

      {totalTickets > 0 && (
        <FooterButton
          name={"Pay Now"}
          value={{ totalPrice: totalPrice, tickets: totalTickets }}
          onView={(value: boolean) => { setSeat("Platinum Class") }}
          onSubmit={(value: boolean) => { razorPay() }}
        />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={3000}
        action={{
          label: "OK",
          onPress: hideSnackbar,
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 2,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  seatRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#EEE6F9",
    borderRadius: 5
  },
  filter: {
    marginHorizontal: 20,
  },
  filtered: {
    borderWidth: 1,
    backgroundColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    color: "white"
  },
  unFiltered: {
    borderWidth: 1,
    borderColor: "#7A7A7A",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5
  },
  stageLayout: {
    margin: 20,
    borderRadius: 5,
    overflow: "hidden",
    width: "auto",
  },
  row1: { flex: 1 },
  row2: { flex: 1.5 },
  row3: { flex: 2 },
  stage: {
    backgroundColor: "#F1F0E9", justifyContent: "flex-start", alignItems: "center", paddingBottom: 10, borderWidth: 2,
    borderColor: "white",
    borderRadius: 7
  },
  stageContainer: { backgroundColor: "#E6E6E6", marginHorizontal: 10, marginBottom: 10, paddingVertical: 10, width: "35%", alignItems: "center", justifyContent: "center", borderRadius: 4 },
  stageText: { color: "#7A7A7A", fontWeight: "bold", textAlign: "center" },
  platinumClass: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 7
  },
  goldClass: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 7
  },
  silverClass: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 4,
    borderColor: "white",
    borderRadius: 7
  },
  sectionTitle: {
    fontSize: 16,
    color: "#757575",
    fontWeight: "bold",
    marginBottom: 5,
  },
  rulesText: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 3,
  },
  classText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center"
  },
  seatCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8
  },
  seatText: {
    fontSize: 16,
  },
  seatAvailability: {
    color: "red",
    fontSize: 12
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  counterButton: {
    padding: 3,
    backgroundColor: "#eee",
    borderRadius: 20
  },
  count: {
    marginHorizontal: 10,
    fontSize: 16
  },
  bottomPadding: {
    height: 70,
  },
});

export default SelectSeats;