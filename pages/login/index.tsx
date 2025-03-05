import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const IMG_BASE_URL = "https://res.cloudinary.com/dgvuytgom/image/upload/";

const Login = () => {

  const navigation = useNavigation<LoginNavigationProp>(); // Get navigation object
  const Happening = "v1740920897/happening/Happening_besy9i.png";

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={"dark-content"}
        showHideTransition={"fade"}
        hidden={false}
      />
      <Image source={{ uri: IMG_BASE_URL + Happening }} style={styles.logo} />
      <Text style={styles.loginText}>Login now to find what's happening around you</Text>

      <TextInput style={styles.input} placeholder="Email address or mobile number" />
      <TextInput style={styles.input} placeholder="Enter OTP" secureTextEntry />

      <TouchableOpacity style={styles.sendOtpButton}>
        <Text style={styles.sendOtpText}>Send OTP</Text>
      </TouchableOpacity>

      {/* Navigate to Home on Click */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>
      <Text style={styles.signInText}>Sign in with other accounts</Text>

      <View style={styles.socialIcons}>
        <TouchableOpacity>
          <Icon name="instagram" size={30} color="white" style={{ paddingVertical: 4, paddingHorizontal: 6, borderRadius: 20, backgroundColor: "#E4405F" }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="facebook" size={30} color="white" style={{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20, backgroundColor: "#1877F2" }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="twitter" size={30} color="white" style={{ paddingVertical: 4, paddingHorizontal: 6, borderRadius: 20, backgroundColor: "#1DA1F2" }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 10
  },
  loginText: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  sendOtpButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  sendOtpText: {
    color: "#7E2CCF",
    fontSize: 14,
    fontWeight: "bold",
  },
  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "#7E2CCF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
    color: "#A3A3A3",
  },
  signInText: {
    fontSize: 16,
    color: "#A3A3A3",
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 150,
  },
});

export default Login;
