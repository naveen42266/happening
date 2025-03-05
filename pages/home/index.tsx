import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, StyleSheet, Dimensions, StatusBar, Button, Alert } from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomTabs from "../../components/bottomTabs";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import HomeComponent from "../../components/home";
import BookingComponent from "../../components/booking";
import SearchComponent from "../../components/search";
import WishlistComponent from "../../components/wishlist";
import AccountComponent from "../../components/account";

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const Home = () => {

    const navigation = useNavigation<HomeNavigationProp>(); // Get navigation object
    const [tab, setTab] = useState("Home");

    const navigateTo = (screen: any) => {
        navigation.navigate(screen);
    };

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Logout",
                    onPress: async () => {
                        //     await AsyncStorage.removeItem("userToken"); // Clear user token
                        navigation.navigate("Login"); // Navigate to Login screen
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="white"
                barStyle={"dark-content"}
                showHideTransition={"fade"}
                hidden={false}
            />
            <ScrollView style={styles.content}>

                {
                    tab === "Home" ?
                        <HomeComponent navigation={(value: any, params) => { navigation.navigate(value, params) }} />
                        :
                        tab === "Booking" ? <BookingComponent />
                            :
                            tab === "Search" ? <SearchComponent />
                                :
                                tab === "Wishlist" ? <WishlistComponent />
                                    :
                                    tab === "Account" ? <AccountComponent navigatation={(value: string) => { navigateTo(value); }} logout={() => { handleLogout() }} /> : null
                }

            </ScrollView>


            <BottomTabs onChangetab={(tabName: string) => { setTab(tabName) }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    content: {
        flex: 1, // Takes up all available space except for the bottom tabs
    },
});

export default Home;
