import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const WelcomeScreen = () => {
  const Happening = "https://res.cloudinary.com/dgvuytgom/image/upload/v1740920897/happening/Happening_besy9i.png";

  return (
    <View style={styles.logoContainer}>
      <Image
        source={{uri: Happening}} // Replace with your logo path
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color of the screen
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default WelcomeScreen;