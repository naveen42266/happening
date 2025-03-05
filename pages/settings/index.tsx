import React, { useState } from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;


const Settings = () => {
    const navigation = useNavigation<EventsNavigationProp>();

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const handleNotificationsToggle = () => {
        setNotificationsEnabled((prev) => !prev);
    };

    const handleDarkModeToggle = () => {
        setDarkModeEnabled((prev) => !prev);
    };

    const onBack = () => {
        navigation.goBack();
    };

    const onNavigate = (screen: any) => {
        navigation.navigate(screen);
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

            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView style={styles.contentContainer}>
                {/* Notifications Toggle */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Enable Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={handleNotificationsToggle}
                        trackColor={{ false: "#ccc", true: "#7E2CCF" }}
                        thumbColor={notificationsEnabled ? "#fff" : "#fff"}
                    />
                </View>

                {/* Dark Mode Toggle */}
                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Dark Mode</Text>
                    <Switch
                        value={darkModeEnabled}
                        onValueChange={handleDarkModeToggle}
                        trackColor={{ false: "#ccc", true: "#7E2CCF" }}
                        thumbColor={darkModeEnabled ? "#fff" : "#fff"}
                    />
                </View>

                {/* Additional Settings */}
                <TouchableOpacity style={styles.settingItem} onPress={() => { onNavigate('PrivacyPolicy') }}>
                    <Text style={styles.settingText}>Privacy Policy</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#7E2CCF" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => { onNavigate('TermsOfService') }}>
                    <Text style={styles.settingText}>Terms of Service</Text>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#7E2CCF" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 20,
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
    title: {
        fontSize: 20,
        fontWeight: "bold",
        // marginBottom: 20,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    settingText: {
        fontSize: 16,
    },
});

export default Settings;