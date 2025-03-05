import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LocationBottomDrawer from "../locationDrawer";
import Config from 'react-native-config';
import { categories, popular, resumeBooking } from "../../data/home";

interface Location {
    city: string;
    address: string;
}

interface HomeComponentProps {
    navigation: (value: string, params: {}) => void;
}

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";



const HomeComponent: React.FC<HomeComponentProps> = ({ navigation }) => {

    const Happening = "v1740920897/happening/Happening_besy9i.png";
    const [listing, setListing] = useState('Entertainment');
    const [location, setLocation] = useState<Location>({ city: "Bangalore", address: "Eco-Space, Bellandur." });
    const [resumeBookingList, setResumeBookingList] = useState(resumeBooking);

    const formatCategoryName = (name: string) => {
        return name.length === 9 ? name : name.length > 9 ? name.slice(0, 6) + "..." : name;
    };

    const [drawerVisible, setDrawerVisible] = useState(false);

    const handleLocationConfirm = (location: any) => {
        setLocation({ city: location.name, address: location.address });
        console.log('Selected Location:', location);
        setDrawerVisible(false);
    };

    // Add this function to toggle the drawer
    const toggleLocationDrawer = () => {
        setDrawerVisible(true);
    };

    const handleCategoryPress = (categoryId: string) => {
        navigation("Events", { categoryId }); // Navigate to EventsPage with categoryId
    };

    const onCloseResumeBooking = (id: string) => {
        setResumeBookingList((prevList) => prevList.filter((item) => item.id !== id));
    };


    // useEffect(() => {
    //     console.log('API_KEY:', Config.API_KEY);
    //     console.log('BASE_URL:', Config.BASE_URL);
    //   }, []);

    return (
        <View>
            {/* Header Section */}
            <View style={styles.header}>
                <Image source={{ uri: IMG_BASE_URL + Happening }} style={styles.headerLogo} />
                <TouchableOpacity style={styles.bellIconContainer} onPress={() => navigation("Notification", {})}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color="#5F6368" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>4</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/* Location Section */}
            <TouchableOpacity
                style={styles.locationContainer}
                onPress={toggleLocationDrawer}
            >
                <EvilIcons name="location" size={24} />
                <View>
                    <Text style={styles.location}>{location.city}</Text>
                    <Text style={styles.address}>{location.address}</Text>
                </View>
            </TouchableOpacity>

            {/* Listings Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, listing === 'Entertainment' ? styles.activeTab : null, { borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }]} onPress={() => setListing("Entertainment")}>
                    <Text style={listing === 'Entertainment' ? styles.activeTabText : styles.tabText}>Entertainment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, listing === 'Academic' ? styles.activeTab : null]} onPress={() => setListing("Academic")}>
                    <Text style={listing === 'Academic' ? styles.activeTabText : styles.tabText}>Academic</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tab, listing === 'Volunteering' ? styles.activeTab : null, { borderTopRightRadius: 10, borderBottomRightRadius: 10 }]} onPress={() => setListing("Volunteering")}>
                    <Text style={listing === 'Volunteering' ? styles.activeTabText : styles.tabText}>Volunteering</Text>
                </TouchableOpacity>
            </View>

            {/* Categories Grid with Horizontal Scroll */}
            <Text style={styles.sectionTitle}>Pick your category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{ marginHorizontal: 15 }}>
                    {/* First Row */}
                    <View style={styles.row}>
                        {categories.slice(0, 6).map((item) => (
                            <TouchableOpacity key={item.id} style={styles.categoryCard} onPress={() => handleCategoryPress(item.id)}>
                                <Image source={{ uri: IMG_BASE_URL + item.image }} style={styles.categoryImage} />
                                <Text style={styles.categoryText}>{formatCategoryName(item.name)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {/* Second Row */}
                    <View style={styles.row}>
                        {categories.slice(6, 12).map((item) => (
                            <TouchableOpacity key={item.id} style={styles.categoryCard} onPress={() => handleCategoryPress(item.id)}>
                                <Image source={{ uri: IMG_BASE_URL + item.image }} style={styles.categoryImage} />
                                <Text style={styles.categoryText}>{formatCategoryName(item.name)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Most Popular Section */}
            <Text style={styles.sectionTitle}>Most Popular</Text>
            {/* Add Scrollable Popular Event Cards Here */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10, marginBottom: 10 }} // Add padding to prevent cropping
                snapToInterval={110} // Adjust based on your card width + margin
                decelerationRate="fast"
            >
                <View style={styles.popularRow}>
                    {popular.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.popularCard} onPress={() => navigation("EventDetails", {})}>
                            <Image source={{ uri: IMG_BASE_URL + item.image }} style={styles.popularImage} />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {
                resumeBookingList?.length ? <View>
                    {/* Resume your booking */}
                    <Text style={styles.sectionTitle}>Resume your booking</Text>
                    {/* Add Scrollable Resume your booking Here */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 10 }} // Add padding to prevent cropping
                        snapToInterval={110} // Adjust based on your card width + margin
                        decelerationRate="fast"
                    >
                        <View style={styles.resumeBookingRow}>
                            {resumeBookingList.map((item) => (
                                <View key={item.id} style={styles.resumeBookingCard}>
                                    <TouchableOpacity onPress={() => { navigation("SelectSeats", {}) }}>
                                        <Image source={{ uri: IMG_BASE_URL + item.image }} style={styles.resumeBookingImage} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.resumeBookingCancel} onPress={() => { onCloseResumeBooking(item.id) }}>
                                        <MaterialIcons name="cancel" size={24} color={"#fff"} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View> : null
            }


            {drawerVisible ?
                <LocationBottomDrawer
                    isVisible={drawerVisible}
                    onClose={() => setDrawerVisible(false)}
                    onConfirm={handleLocationConfirm}
                    initiallyOpen={true}
                /> : null}
        </View>

    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",  // Center content by default
        position: "relative",
        height: 50,  // Adjust height if needed
        marginBottom: 10,
    },
    headerLogo: {
        position: "absolute",
        left: "50%",
        transform: [{ translateX: -50 }], // Ensure it's centered properly
        width: 100,
        height: 40,
    },
    bellIconContainer: {
        position: "absolute",
        right: 20, // Keep it at the end
    },
    badge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#7E2CCF",
        borderRadius: 10,
        minWidth: 14,
        height: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
    },
    locationContainer: {
        backgroundColor: "#F9F5FD",
        padding: 10,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#7E2CCF",
    },
    address: {
        fontSize: 14,
        // color: "#666",
    },
    tabs: {
        marginHorizontal: 20, // Keeps spacing from the screen edges
        flexDirection: "row",
        justifyContent: "space-between", // Ensures tabs spread out evenly
        paddingVertical: 10,
    },
    tab: {
        flex: 1, // Makes each tab take equal space
        paddingVertical: 5,
        alignItems: "center", // Centers text inside tabs
        borderWidth: 1,
        borderColor: "#7E2CCF",
    },
    activeTab: {
        backgroundColor: "#F9F5FD"
        // "#7E2CCF",
    },
    tabText: {
        color: "#3C3C3C",
        // "#666",
        fontSize: 14,
    },
    activeTabText: {
        color: "#7E2CCF",
        // "#fff",
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        paddingHorizontal: 20,
        paddingBottom: 14,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    categoryCard: {
        alignItems: "center",
        justifyContent: "center", // Center content vertically and horizontally
        marginLeft: 8,
        width: 90, // Fixed width
        height: 90, // Fixed height
        borderRadius: 10, // Optional: Add border radius to the card
        overflow: "hidden", // Ensure child components respect the border radius
    },
    categoryImage: {
        width: "100%", // Take up the full width of the parent
        height: "100%", // Take up the full height of the parent
        borderRadius: 10, // Optional: Add border radius to the image
    },
    categoryText: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0, // Position at the bottom of the card
        fontSize: 14,
        paddingVertical: 5, // Add vertical padding for better spacing
        color: "#5A5A5A",
        textAlign: "center",
        backgroundColor: "#F9F5FDE5", // Semi-transparent background for the text
        paddingHorizontal: 5, // Add horizontal padding
        borderBottomLeftRadius: 10, // Match the card's border radius
        borderBottomRightRadius: 10, // Match the card's border radius

        // Shadow for text
        textShadowColor: "rgba(0, 0, 0, 0.3)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    popularCard: {
        alignItems: "center",
        marginLeft: 10,
        width: 200, // Card width
        height: 110,
    },
    popularImage: {
        width: 200,
        height: 110,
        borderRadius: 10,
    },
    popularRow: {
        flexDirection: "row",
        paddingRight: 30, // Extra space to ensure smooth scrolling
    },
    resumeBookingCard: {
        position: "relative",
        alignItems: "center",
        marginLeft: 10,
        width: 160, // Card width
        height: 100,
    },
    resumeBookingImage: {
        width: 160,
        height: 100,
        borderRadius: 10,
    },
    resumeBookingRow: {
        flexDirection: "row",
        paddingRight: 30, // Extra space to ensure smooth scrolling
        marginBottom: 20,
    },
    resumeBookingCancel: {
        position: "absolute",
        top: 5,
        right: 5,
        backgroundColor: "#000",
        borderRadius: 20,
    }


});

export default HomeComponent;