import React from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'PrivacyPolicy'>;

const PrivacyPolicy = () => {
    const navigation = useNavigation<EventsNavigationProp>();

    const onBack = () => {
        navigation.goBack();
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
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Policy</Text>
            </View>

            {/* Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.content}>
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app.
                </Text>
                <Text style={styles.subtitle}>1. Information We Collect</Text>
                <Text style={styles.content}>
                    We may collect the following types of information:
                    {"\n"}- Personal Information: Name, email address, phone number, etc.
                    {"\n"}- Usage Data: Information about how you use the app.
                    {"\n"}- Device Information: Device type, operating system, etc.
                </Text>
                <Text style={styles.subtitle}>2. How We Use Your Information</Text>
                <Text style={styles.content}>
                    We use your information to:
                    {"\n"}- Provide and improve our services.
                    {"\n"}- Communicate with you about updates and offers.
                    {"\n"}- Ensure the security of our app.
                </Text>
                <Text style={styles.subtitle}>3. Sharing Your Information</Text>
                <Text style={styles.content}>
                    We do not share your personal information with third parties except as required by law or to protect our rights.
                </Text>
                <Text style={styles.subtitle}>4. Your Rights</Text>
                <Text style={styles.content}>
                    You have the right to:
                    {"\n"}- Access and update your personal information.
                    {"\n"}- Request deletion of your data.
                    {"\n"}- Opt-out of marketing communications.
                </Text>
                <Text style={styles.subtitle}>5. Contact Us</Text>
                <Text style={styles.content}>
                    If you have any questions about this Privacy Policy, please contact us at privacy@example.com.
                </Text>
            </ScrollView>
        </View>
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
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 16,
        marginBottom: 8,
        color: "#333",
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
        color: "#666",
    },
});

export default PrivacyPolicy;