import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'Events'>;

interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: string;
    isRead: boolean;
}

const Notification = () => {
    const navigation = useNavigation<EventsNavigationProp>();

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: "1",
            title: "New Event Alert",
            message: "AR Rahman Concert is happening next week!",
            timestamp: "2 hours ago",
            isRead: false,
        },
        {
            id: "2",
            title: "Reminder",
            message: "Your ticket for Tech Expo 2023 is confirmed.",
            timestamp: "1 day ago",
            isRead: true,
        },
        {
            id: "3",
            title: "Special Offer",
            message: "Get 20% off on all food fest tickets.",
            timestamp: "3 days ago",
            isRead: false,
        },
        {
            id: "4",
            title: "Event Update",
            message: "The Stand-up Comedy Night has been rescheduled.",
            timestamp: "5 days ago",
            isRead: true,
        },
    ]);

    const onBack = () => {
        navigation.goBack();
    };

    const markAsRead = (id: string) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        );
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    const renderNotificationItem = ({ item }: { item: Notification }) => (
        <TouchableOpacity
            style={[styles.notificationItem, item.isRead ? styles.readNotification : styles.unreadNotification]}
            onPress={() => markAsRead(item.id)}
        >
            <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTimestamp}>{item.timestamp}</Text>
            </View>
            {!item.isRead && <View style={styles.unreadIndicator} />}
        </TouchableOpacity>
    );

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
                <View style={styles.headerFlex}>
                    <Ionicons name="chevron-back" size={24} style={styles.backButton} onPress={()=> onBack()}/>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>
                <TouchableOpacity onPress={clearAllNotifications}>
                    <Text style={styles.clearButton}>Clear All</Text>
                </TouchableOpacity>
            </View>

            {/* Notification List */}
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="notifications-off-outline" size={50} color="#ccc" />
                        <Text style={styles.emptyText}>No notifications</Text>
                    </View>
                }
            />
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },

    headerFlex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingHorizontal: 16,
    },

    backButton: {
        padding: 8,
        marginRight: 8,
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    clearButton: {
        fontSize: 16,
        color: "#7E2CCF",
    },
    listContent: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    notificationItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
    },
    readNotification: {
        opacity: 0.6,
    },
    unreadNotification: {
        opacity: 1,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    notificationMessage: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    notificationTimestamp: {
        fontSize: 12,
        color: "#999",
    },
    unreadIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#7E2CCF",
        marginLeft: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: "#ccc",
        marginTop: 10,
    },
});

export default Notification;