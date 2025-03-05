import { Alert, Button, Linking, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useCallback, useState } from "react";

type OpenURLButtonProps = {
    url: string;
    children: string;
};

const AboutComponent = () => {
    const [like, setLike] = useState(true);

    const OpenURLButton = ({ url, children }: OpenURLButtonProps) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

        return <Text onPress={handlePress} >{children}</Text>;
    };

    return (
        <View>
            {/* Event Details */}
            <View style={styles.contentContainer}>
                <Text style={styles.title}>The Complete AR Rahman Show</Text>
                <View style={styles.tagContainer}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                        <Ionicons name="heart" color={"#6B46C1"} size={20} />
                        <Text style={styles.interested}>157 interested</Text>
                        <View style={styles.teaser}>
                            <Ionicons name="play-circle-outline" color={"#7E2CCF"} size={20} />
                            <OpenURLButton url={"https://www.youtube.com/watch?v=DcLq8P_YAAs"}>Teaser</OpenURLButton>
                            {/* <Text>Teaser</Text> */}
                        </View>
                        <Ionicons name="flash-outline" color={"#FF935B"} size={20} />
                        <Text style={styles.fastFilling}>Fast Filling</Text>
                    </View>
                    {
                        like ?
                            <Ionicons name="heart" color={"#6B46C1"} size={20} style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 20, padding: 2 }} onPress={() => { setLike(!like) }} />
                            :
                            <Ionicons name="heart-outline" color={"#6B46C1"} size={20} style={{ backgroundColor: "rgba(255, 255, 255, 0.7)", borderRadius: 20, padding: 2 }} onPress={() => { setLike(!like) }} />
                    }
                </View>
                <View style={styles.details}>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <FontAwesome5 name="hourglass-start" color={"#5F6368"} size={18} />
                        <Text style={{ color: "#757575" }}>2h 30m</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <FontAwesome6 name="user-large" color={"#5F6368"} size={18} />
                        <Text style={{ color: "#757575" }}>5 years+</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <MaterialCommunityIcons name="music-circle" color={"#5F6368"} size={24} />
                        <Text style={{ color: "#757575" }}>Bollywood, Retro</Text>
                    </View>
                </View>
                <View style={styles.details}>
                    <Fontisto name="world-o" color={"#5F6368"} size={24} />
                    <Text style={{ color: "#757575" }}>Hindi, Tamil</Text>
                </View>
                <View style={styles.details}>
                    <MaterialCommunityIcons name="calendar" color={"#5F6368"} size={24} />
                    <Text style={{ color: "#757575" }}>Sat 26.Oct.2024</Text>
                </View>
                <Text style={styles.details}> Price:
                    <Text style={{ fontWeight: "bold" }}>
                        {" "} ₹480 - ₹1150
                    </Text>
                </Text>

                <View style={{ borderWidth: 1, borderBlockColor: "#E8DFF4", marginVertical: 4 }}></View>

                {/* Location & Time */}
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={18} color="black" style={{ fontWeight: "bold" }} />
                    <Text style={styles.infoText}>North Avenue Grounds, Bangalore</Text>
                    <MaterialIcons name="info-outline" size={18} color="black" style={{ fontWeight: "bold" }} onPress={() => Alert.alert('Due to heavy traffic, we kindly request your early arrival.')} />
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.time}>7:00 PM</Text>
                    <Text style={styles.seats}>16 seats left</Text>
                </View>
                {/* <Text style={styles.noSeats}>⚠️ No seats left</Text> */}

                <View style={styles.nearby}>
                    <MaterialCommunityIcons name="format-paragraph" color="#7A7A7A" size={28} />
                    <FontAwesome name="wheelchair" color="#7A7A7A" size={20} />
                    <MaterialCommunityIcons name="silverware-fork-knife" color="#7A7A7A" size={24} />
                    <Ionicons name="map-sharp" size={18} color="#7A7A7A" style={{ fontWeight: "bold" }} />
                    <OpenURLButton url={"https://www.google.com/maps"}>
                      Text
                    </OpenURLButton>
                </View>


                <View style={{ borderWidth: 1, borderBlockColor: "#E8DFF4", marginVertical: 4 }}></View>
            </View>

            {/* Policies & Rules */}
            <View style={styles.contentContainer}>
                <Text style={styles.sectionTitle}>Policies & Rules</Text>
                <Text style={styles.rulesText}>• Follow organiser guidelines</Text>
                <Text style={styles.rulesText}>• Drugs, smoke, and alcohol consumption prohibited</Text>
                <Text style={styles.rulesText}>• Kids below 5 years not recommended</Text>
            </View>

            {/* Offers */}
            <View style={styles.contentContainer}>
                <Text style={styles.sectionTitle}>Offers for You</Text>
                <Text style={styles.rulesText}>• Get 10% off on bookings above ₹1500 with Card</Text>
                <Text style={styles.rulesText}>• Avail ₹200 cashback on bookings above ₹2000</Text>
                <Text style={styles.rulesText}>• Use instant ₹100 discount on first booking</Text>
                <Text style={styles.rulesText}>• Pay via Paytm Wallet for an extra 5% discount</Text>
                <Text style={styles.rulesText}>• Get ₹250 off on group bookings of 4</Text>
                <Text style={styles.rulesText}>• Use Amazon Pay for a 7% cashback up to ₹150</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
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
})

export default AboutComponent;