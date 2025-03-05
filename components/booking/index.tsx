import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";


const bookings = [
    { id: "1", name: "Concert Night", date: "25 Oct 2023", image: "v1740929254/happening/concerts_o68hwt.png" },
    { id: "2", name: "Tech Expo", date: "30 Oct 2023", image: "v1740969396/happening/techexpo_tcu1ar.jpg" },
];

const BookingComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Booking</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {bookings.map((item) => (
                    <View key={item.id} style={styles.bookingCard}>
                        <Image source={{ uri: IMG_BASE_URL + item.image }} style={styles.bookingImage} />
                        <View style={styles.bookingDetails}>
                            <Text style={styles.bookingName}>{item.name}</Text>
                            <Text style={styles.bookingDate}>{item.date}</Text>
                        </View>
                        <TouchableOpacity style={styles.cancelButton}>
                            <MaterialIcons name="cancel" size={24} color="#FF0000" />
                        </TouchableOpacity>
                    </View>
                ))}
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
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    bookingCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F5FD",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    bookingImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    bookingDetails: {
        flex: 1,
        marginLeft: 10,
    },
    bookingName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    bookingDate: {
        fontSize: 14,
        color: "#666",
    },
    cancelButton: {
        padding: 10,
    },
});

export default BookingComponent;