import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Share, Alert, StatusBar } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FooterButton from "../../components/footerButton";
import AboutComponent from "../../components/eventDetails/about";
import CrewComponent from "../../components/eventDetails/crew";
import { Button } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type EventDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'EventDetails'>;

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";

const EventDetails = () => {
  const navigation = useNavigation<EventDetailsNavigationProp>(); // Get navigation object

  const [tab, setTab] = useState("About");
  const [proceed, setProceed] = useState(true);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Hi there! I found this event on Happening and thought you might be interested in it. Check it out: https://drive.google.com/file/d/1QKXnCo95tvX2DaaIKljFgYX8dEInGrns/view?usp=sharing',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };


  function onNext(isTrue: boolean) {
    if (isTrue) {
      navigation.navigate("SelectSeats");
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Event Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: IMG_BASE_URL + "v1740920899/happening/events_sohfcf.png" }}
            style={styles.eventImage}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => { navigation.goBack(); }}>
            <Ionicons name="chevron-back" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton} onPress={onShare}>
            <Ionicons name="share-social-outline" size={24} />
          </TouchableOpacity>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            {["About", "Crew"].map((each: string) => (
              <Text
                key={each}
                style={[
                  each === tab ? styles.activeTab : styles.inactiveTab,
                  each === "About" && tab === "Crew" ? styles.aboutTab : null,
                  each === "Crew" && tab === "About" ? styles.crewTab : null,
                ]}
                onPress={() => setTab(each)}
              >
                <Text style={each === tab ? styles.activeTabText : styles.inactiveTabText}>
                  {each}
                </Text>
              </Text>
            ))}
          </View>
        </View>

        {tab === "About" ? <AboutComponent /> : <CrewComponent />}

      </ScrollView>

      {/* Footer Button */}
      {proceed ? <FooterButton name="Proceed" value={{}} onView={(isTrue) => { }} onSubmit={(isTrue) => { onNext(isTrue) }} /> : <FooterButton name="Proceed" value={{ content: "Select time slot to proceed" }} onView={(isTrue) => { }} onSubmit={(isTrue) => { setProceed(isTrue); }} />}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
    paddingBottom: 100, // Add padding to avoid overlap with the button
  },
  imageContainer: {
    position: "relative",
  },
  eventImage: {
    width: 412,
    height: 230,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
  },
  favoriteButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 2
  },
  tabContainer: {
    position: "absolute",
    bottom: -10,
    left: 20,
    flexDirection: "row",
    marginVertical: 10,
    // marginLeft: 25,
  },
  aboutTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#EEE6F9",
    borderRightWidth: 2,
    borderRightColor: "#EEE6F9",
  },
  crewTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#EEE6F9",
    borderLeftWidth: 2,
    borderLeftColor: "#EEE6F9",
  },
  activeTab: {
    paddingBottom: 5,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  activeTabText: {
    color: "#6B46C1",
    fontWeight: "bold",
  },
  inactiveTab: {
    backgroundColor: "#FBFBFB",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  inactiveTabText: {
    color: "#757575",
  },

  contentContainer: {
    paddingHorizontal: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  interested: {
    color: "#6B46C1",
    fontWeight: "bold",
  },
  dot: {
    color: "#A0AEC0",
    marginHorizontal: 5,
  },
  teaser: {
    flexDirection: "row",
    backgroundColor: "#F9F5FD",
    padding: 4,
    borderWidth: 2,
    borderColor: "#EEE6F9",
    borderRadius: 10
  },
  fastFilling: {
    color: "#FF935B",
    fontWeight: "bold",
  },
  details: {
    flexDirection: "row",
    gap: 10,
    fontSize: 14,
    color: "#757575",
    marginVertical: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 4
  },
  infoText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  time: {
    flexDirection: "row",
    backgroundColor: "#F9F5FD",
    padding: 4,
    borderWidth: 2,
    borderColor: "#EEE6F9",
    borderRadius: 15
  },
  seats: {
    color: "#FF935B",
  },
  noSeats: {
    color: "#E53E3E",
    fontWeight: "bold",
    marginTop: 5,
  },
  nearby: {
    flexDirection: "row",
    alignItems: "center",
    color: "#7A7A7A",
    marginVertical: 5,
    gap: 8
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
});

export default EventDetails;