import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from './types'; // Import the route types
import LoginScreen from "./pages/login";
import HomeScreen from "./pages/home";
import EventDetailsScreen from "./pages/eventDetails";
import SelectSeatsScreen from "./pages/selectSeats";
import StatusBarCheck from "./pages/statusBarCheck";
import WelcomeScreen from "./pages/welcomeScreen";
import EventsScreen from "./pages/events";
import SettingsScreen from "./pages/settings";
import EditProfileScreen from "./pages/editProfile";
import PrivacyPolicyScreen from "./pages/privacyPolicy";
import TermsOfServiceScreen from "./pages/termsOfService";
import NotificationScreen from "./pages/notification";
import OrderConfirmationScreen from "./pages/orderConfirmation";

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Events" component={EventsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelectSeats" component={SelectSeatsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
