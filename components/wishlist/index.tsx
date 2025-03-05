import React from "react";
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";

const wishlist = [
    { id: "1", name: "Stand-up Comedy", image: "v1740929763/happening/standupcomedy_cgdigc.jpg" },
    { id: "2", name: "Fashion Show", image: "v1740969395/happening/fashionshow_hmgncr.jpg" },
];

const WishlistComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Your Wishlist</Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {wishlist.map((item) => (
                    <View key={item.id} style={styles.wishlistCard}>
                        <Image source={{ uri: IMG_BASE_URL + item.image }} style={styles.wishlistImage} />
                        <Text style={styles.wishlistName}>{item.name}</Text>
                        <TouchableOpacity style={styles.removeButton}>
                            <MaterialIcons name="delete" size={24} color="#FF0000" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View >
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
    wishlistCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F5FD",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    wishlistImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    wishlistName: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    removeButton: {
        padding: 10,
    },
});

export default WishlistComponent;