import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, StatusBar, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type EventsNavigationProp = StackNavigationProp<RootStackParamList, 'Events'>;
const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";

const EditProfile = () => {
    const [name, setName] = useState("Naveen");
    const [email, setEmail] = useState("naveen@example.com");
    const navigation = useNavigation<EventsNavigationProp>();


    const handleSave = () => {
        // Add logic to save the updated profile information
        Alert.alert("Success", "Profile updated successfully!");
    };

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

            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Profile Picture */}
                <View style={styles.profileImageContainer}>
                    <View style={{ position: "relative" }}>
                        <Image
                            source={{ uri: IMG_BASE_URL + "v1740920898/happening/arr_lczjzv.png" }}
                            style={styles.profileImage}
                        />
                        <TouchableOpacity style={styles.editIcon}>
                            <MaterialIcons name="edit" size={20} color="#7E2CCF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
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
    profileImageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        // position: "relative",
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    editIcon: {
        position: "absolute",
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        // elevation: 0.1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: "#7E2CCF",
        borderRadius: 10,
        padding: 15,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default EditProfile;