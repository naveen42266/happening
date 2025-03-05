import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";

interface AccountComponentProps {
    navigatation: (value: string) => void;
    logout: () => void;
}
const AccountComponent: React.FC<AccountComponentProps> = ({ navigatation, logout }) => {
    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: IMG_BASE_URL + "v1740920898/happening/arr_lczjzv.png" }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Naveen</Text>
                <Text style={styles.profileEmail}>naveen@example.com</Text>
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigatation("EditProfile")}>
                <Text style={styles.menuText}>Edit Profile</Text>
                <MaterialIcons name="arrow-forward-ios" size={20} color="#7E2CCF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigatation("Settings")}>
                <Text style={styles.menuText}>Settings</Text>
                <MaterialIcons name="arrow-forward-ios" size={20} color="#7E2CCF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => logout()}>
                <Text style={styles.menuText}>Logout</Text>
                <MaterialIcons name="arrow-forward-ios" size={20} color="#7E2CCF" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
    },
    profileEmail: {
        fontSize: 16,
        color: "#666",
    },
    menuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#F9F5FD",
    },
    menuText: {
        fontSize: 18,
    },
});

export default AccountComponent;