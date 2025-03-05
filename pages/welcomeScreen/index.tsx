import React from 'react';
import { View, StyleSheet } from 'react-native';
import Logo from '../../components/welcomeScreen'; // Import the Logo component
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { RootStackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
    const navigation = useNavigation<WelcomeScreenNavigationProp>(); // Get navigation object

    setTimeout(() => {
        navigation.navigate("Login");
    }, 3000);

    return (
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="white"
                barStyle={"dark-content"}
                showHideTransition={"fade"}
                hidden={false}
            />
            <Logo />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default WelcomeScreen;