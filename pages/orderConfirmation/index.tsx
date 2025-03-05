import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types"; // Adjust the import path as needed
import { CommonActions } from '@react-navigation/native';

type OrderConfirmationNavigationProp = StackNavigationProp<RootStackParamList, 'OrderConfirmation'>;

const OrderConfirmation = () => {
    const navigation = useNavigation<OrderConfirmationNavigationProp>();

    const handleDone = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0, // Reset to the first (and only) route
                routes: [
                    { name: 'Home' }, // Set Home as the only route in the stack
                ],
            })
        ); // Navigate to Home screen
    };

    return (
        <View style={styles.container}>
            {/* Big Verified/Confirmation Tick Icon */}
            <Image
                source={{ uri: "https://cdn-icons-png.flaticon.com/512/7518/7518748.png" }} // Replace with your tick icon URL
                style={styles.tickIcon}
            />

            {/* Thank You Text */}
            <Text style={styles.thankYouText}>Thank You!</Text>

            {/* Order Confirmed Text */}
            <Text style={styles.orderConfirmedText}>Your order is confirmed</Text>

            {/* Done Button */}
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
                <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    tickIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    thankYouText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    orderConfirmedText: {
        fontSize: 20,
        color: "#666",
        marginBottom: 30,
    },
    doneButton: {
        backgroundColor: "#7E2CCF",
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignItems: "center",
    },
    doneButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default OrderConfirmation;