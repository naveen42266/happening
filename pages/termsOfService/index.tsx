import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'TermsOfService'>;

const TermsOfService = () => {
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
                <Text style={styles.headerTitle}>Terms of Service</Text>
            </View>
            <ScrollView style={styles.contentContainer}>
                <Text style={styles.content}>
                    Welcome to our app! By using our app, you agree to these Terms of Service. Please read them carefully.
                </Text>
                <Text style={styles.subtitle}>1. Acceptance of Terms</Text>
                <Text style={styles.content}>
                    By accessing or using our app, you agree to be bound by these Terms of Service and our Privacy Policy.
                </Text>
                <Text style={styles.subtitle}>2. User Responsibilities</Text>
                <Text style={styles.content}>
                    You agree to:
                    - Use the app only for lawful purposes.
                    - Not engage in any activity that disrupts the app's functionality.
                    - Respect the rights of other users.
                </Text>
                <Text style={styles.subtitle}>3. Intellectual Property</Text>
                <Text style={styles.content}>
                    All content and features in the app are owned by us and are protected by intellectual property laws.
                </Text>
                <Text style={styles.subtitle}>4. Limitation of Liability</Text>
                <Text style={styles.content}>
                    We are not liable for any damages arising from your use of the app.
                </Text>
                <Text style={styles.subtitle}>5. Changes to Terms</Text>
                <Text style={styles.content}>
                    We may update these Terms of Service from time to time. Your continued use of the app constitutes acceptance of the updated terms.
                </Text>
                <Text style={styles.subtitle}>6. Contact Us</Text>
                <Text style={styles.content}>
                    If you have any questions about these Terms of Service, please contact us at support@example.com.
                </Text>
                <Text style={{paddingVertical: 20}}></Text>
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
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
    },
});

export default TermsOfService;