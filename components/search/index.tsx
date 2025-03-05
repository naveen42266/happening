import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";

const events = [
    { id: "1", name: "AR Rahman Concert", image: "v1740920898/happening/arr_lczjzv.png" },
    { id: "2", name: "Tech Expo 2023", image: "v1740969396/happening/techexpo_tcu1ar.jpg" },
];

const SearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for events..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <ScrollView>
                {filteredEvents.map((event) => (
                    <TouchableOpacity key={event.id} style={styles.eventCard}>
                        <Image source={{ uri: IMG_BASE_URL + event.image }} style={styles.eventImage} />
                        <Text style={styles.eventName}>{event.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchInput: {
        height: 40,
        borderColor: "#7E2CCF",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    eventCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    eventImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    eventName: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default SearchComponent;