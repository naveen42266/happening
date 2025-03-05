import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons" //calendar-check-outline

interface BottomTabsProps {
    onChangetab: (tabName: string) => void;
}

const BottomTabs: React.FC<BottomTabsProps> = ({ onChangetab }) => {
    const [selectedTab, setSelectedTab] = useState("Home");

    const tabs = [
        { id: "1", name: "Home", icon: "home" },
        { id: "2", name: "Booking", icon: "calendar" },
        { id: "3", name: "Search", icon: "search" },
        { id: "4", name: "Wishlist", icon: "heart" },
        { id: "5", name: "Account", icon: "user" },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.id}
                    style={styles.tab}
                    onPress={() => { setSelectedTab(tab.name), onChangetab(tab.name) }}
                >
                    {
                        tab.name === "Home" ?
                            <Entypo name={tab.icon} size={24} color={selectedTab === tab.name ? "#7E2CCF" : "#5F6368"} />
                            : tab.name === "Booking" ?
                                <MaterialCommunityIcons name={"calendar-check-outline"} size={24} color={selectedTab === tab.name ? "#7E2CCF" : "#5F6368"} />
                                : tab.name === "Account" ?
                                    <MaterialCommunityIcons name={"account-circle-outline"} size={24} color={selectedTab === tab.name ? "#7E2CCF" : "#5F6368"} />
                                    : <Icon name={tab.icon} size={24} color={selectedTab === tab.name ? "#7E2CCF" : "#5F6368"} />
                    }

                    <Text
                        style={[
                            styles.tabText,
                            { color: selectedTab === tab.name ? "#7E2CCF" : "#5F6368" },
                        ]}
                    >
                        {tab.name}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingVertical: 10,
    },
    tab: {
        alignItems: "center",
    },
    tabText: {
        fontSize: 12,
        marginTop: 5, // Space between icon and text
    },
});

export default BottomTabs;