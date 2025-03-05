import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, StatusBar, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import Ionicons from "react-native-vector-icons/Ionicons";
import { eventsData } from "../../data/events";

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'Events'>;

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";


interface Event {
    categoryId: string;
    id: string;
    name: string;
    image: string;
    date: string;
    location: string;
}


const Events = () => {
    const navigation = useNavigation<EventsNavigationProp>();
    const route = useRoute();
    const { categoryId } = route.params as { categoryId: string }; // Get categoryId from navigation params
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const onBack = () => {
        navigation.goBack();
    };



    // Simulate fetching events by categoryId
    useEffect(() => {
        // Simulate an API call with a delay
        const fetchEvents = async () => {
            try {
                // Simulate a delay for loading
                await new Promise((resolve) => setTimeout(resolve, 1000));

                // Filter events based on categoryId (for demonstration purposes)
                const filteredEvents = eventsData.filter((event) => event.categoryId.toLowerCase() === categoryId.toLowerCase());
                setEvents(filteredEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [categoryId]);

    const renderEventItem = ({ item }: { item: Event }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
        >
            <Image source={{ uri: IMG_BASE_URL + item.image }} style={styles.eventImage} />
            <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>{item.date}</Text>
                <Text style={styles.eventLocation}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7E2CCF" />
            </View>
        );
    }

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
                <Text style={styles.headerTitle}>Events</Text>
            </View>


            <FlatList
                data={events}
                renderItem={renderEventItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />
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
        // paddingHorizontal: 20,
        paddingVertical: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    eventCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F9F5FD",
        borderRadius: 10,
        marginBottom: 16,
        overflow: "hidden",
    },
    eventImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    eventDetails: {
        flex: 1,
        padding: 16,
    },
    eventName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4,
    },
    eventDate: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    eventLocation: {
        fontSize: 14,
        color: "#666",
    },
});

export default Events;