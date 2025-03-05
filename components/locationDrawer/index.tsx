import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  PanResponderGestureState,
  Dimensions,
  TouchableOpacity,
  Switch,
  ScrollView,
  ViewStyle,
  LayoutChangeEvent,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { height, width } = Dimensions.get('window');

interface Location {
  id: string;
  name: string;
  address: string;
  selected?: boolean;
}

interface LocationBottomDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (location: Location) => void;
  style?: ViewStyle;
  initiallyOpen?: boolean;
}

const LocationBottomDrawer: React.FC<LocationBottomDrawerProps> = ({
  isVisible: isVisibleProp,
  onClose,
  onConfirm,
  style,
  initiallyOpen = true,
}) => {
  const [contentHeight, setContentHeight] = useState<number>(450);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [permissionPromptShown, setPermissionPromptShown] = useState<boolean>(false);
  const translateY = useRef(new Animated.Value(initiallyOpen ? 0 : height)).current;
  const backdrop = useRef(new Animated.Value(initiallyOpen ? 1 : 0)).current;
  const isFirstRender = useRef(true);

  const [recentLocations, setRecentLocations] = useState<Location[]>([
    { id: '1', name: 'Mumbai', address: 'Linking Road, Bandra West' },
    { id: '2', name: 'Delhi', address: 'Connaught Place, New Delhi' },
    { id: '3', name: 'Bangalore', address: 'MG Road, Bengaluru' },
    { id: '4', name: 'Chennai', address: 'T. Nagar, Chennai' },
    { id: '5', name: 'Kolkata', address: 'Park Street, Kolkata' },
    { id: '6', name: 'Hyderabad', address: 'Jubilee Hills, Hyderabad' },
    { id: '7', name: 'Pune', address: 'FC Road, Pune' },
  ]);

  const scrollViewHeight = Math.min(recentLocations.length * 50, 150); // 50px per item, max 150px


  useEffect(() => {
    const initialSelected = recentLocations.find(loc => loc.selected);
    if (initialSelected) {
      setSelectedLocationId(initialSelected.id);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isVisibleProp) {
      openDrawer();

      if (!locationPermission && !permissionPromptShown) {
        const timer = setTimeout(() => {
          Alert.alert(
            "Location Permission",
            "Allow this app to access your location for better experience?",
            [
              {
                text: "Not Now",
                style: "cancel"
              },
              {
                text: "Allow",
                onPress: () => setLocationPermission(true)
              }
            ]
          );
          setPermissionPromptShown(true);
        }, 500);

        return () => clearTimeout(timer);
      }
    } else {
      closeDrawer();
    }
  }, [isVisibleProp, locationPermission, permissionPromptShown]);

  const openDrawer = (): void => {
    const openHeight = Math.min(contentHeight, height * 0.9);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height - openHeight,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = (): void => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdrop, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      requestAnimationFrame(() => {
        if (onClose) {
          onClose();
        }
      });
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gesture: PanResponderGestureState) => {
        return gesture.dy > 5;
      },
      onPanResponderMove: (_, gesture: PanResponderGestureState) => {
        if (gesture.dy > 0) {
          translateY.setValue(height - contentHeight + gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture: PanResponderGestureState) => {
        if (gesture.dy > 100) {
          closeDrawer();
        } else {
          openDrawer();
        }
      },
    })
  ).current;

  const handleContentLayout = (event: LayoutChangeEvent): void => {
    const { height: layoutHeight } = event.nativeEvent.layout;
    if (layoutHeight > 0 && layoutHeight !== contentHeight) {
      setContentHeight(layoutHeight);
      if (isVisibleProp && !isFirstRender.current) {
        translateY.setValue(height - layoutHeight);
      }
    }
  };

  const handleLocationSelect = (id: string): void => {
    setSelectedLocationId(id);
    setRecentLocations(prevLocations =>
      prevLocations.map(loc => ({
        ...loc,
        selected: loc.id === id,
      }))
    );
  };

  const handleConfirm = (): void => {
    const selectedLocation = recentLocations.find(loc => loc.id === selectedLocationId);
    if (selectedLocation) {
      onConfirm(selectedLocation);
      closeDrawer();
    }
  };

  const handlePermissionToggle = (value: boolean): void => {
    setLocationPermission(value);
  };

  if (!isVisibleProp && isFirstRender.current) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableOpacity
        style={StyleSheet.absoluteFill}
        activeOpacity={1}
        onPress={closeDrawer}
      >
        <Animated.View
          style={[
            styles.backdrop,
            {
              opacity: backdrop,
            },
          ]}
        />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateY }],
          },
          style,
        ]}
      >
        <View style={styles.handleBarContainer} {...panResponder.panHandlers}>
          <View style={styles.handleBar} />
        </View>

        <View style={styles.content} onLayout={handleContentLayout}>

          <Text style={styles.title}>Select your location</Text>

          <View style={styles.permissionContainer}>
            <Text style={styles.permissionText}>Phone location permission</Text>
            <Switch
              value={locationPermission}
              onValueChange={handlePermissionToggle}
              trackColor={{ false: '#E0E0E0', true: '#D8BEF5' }}
              thumbColor={locationPermission ? '#6C1CCC' : '#F4F3F4'}
            />
          </View>

          {!locationPermission && (
            <View style={styles.permissionMessage}>
              <Ionicons name="information-circle-outline" size={16} color="#6C1CCC" />
              <Text style={styles.permissionMessageText}>
                Enable location permission for better location accuracy
              </Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>Current Location</Text>

          <View style={styles.currentLocationContainer}>
            <View style={styles.locationIconContainer}>
              <Ionicons name="location" size={24} color="#6C1CCC" />
            </View>

            <View style={styles.locationTextContainer}>
              <Text style={styles.locationName}>Bangalore</Text>
              <Text style={styles.locationAddress}>#138 Layout, Indiranagar</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedLocationId === '1' && styles.radioButtonSelected,
              ]}
              onPress={() => handleLocationSelect('1')}
            >
              {selectedLocationId === '1' && <View style={styles.radioInner} />}
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Recent Locations</Text>

          <ScrollView
            style={[styles.recentLocationsContainer, { height: scrollViewHeight }]}
            contentContainerStyle={styles.recentLocationsContent}
          >
            {recentLocations.slice(1).map((location) => (
              <View key={location.id} style={styles.locationItem}>
                <View style={styles.locationIconContainer}>
                  <Ionicons name="location-outline" size={24} color="#000" />
                </View>

                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationName}>{location.name}</Text>
                  {location.address ? (
                    <Text style={styles.locationAddress}>{location.address}</Text>
                  ) : null}
                </View>

                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    selectedLocationId === location.id && styles.radioButtonSelected,
                  ]}
                  onPress={() => handleLocationSelect(location.id)}
                >
                  {selectedLocationId === location.id && <View style={styles.radioInner} />}
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: "100%",
  },
  handleBarContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  handleBar: {
    width: 60,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
  },
  content: {
    padding: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  permissionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  permissionText: {
    fontSize: 14,
    color: '#333',
  },
  permissionMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F8F0FF',
    padding: 10,
    borderRadius: 8,
  },
  permissionMessageText: {
    fontSize: 12,
    color: '#6C1CCC',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 5,
  },
  currentLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  locationIconContainer: {
    marginRight: 15,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 14,
    fontWeight: '500',
  },
  locationAddress: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#6C1CCC',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6C1CCC',
  },
  recentLocationsContainer: {
    maxHeight: 150, // Fixed height for the ScrollView
    marginBottom: 20,
  },
  recentLocationsContent: {
    flexGrow: 1, // Ensures the content can scroll within the fixed height
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  confirmButton: {
    backgroundColor: '#6C1CCC',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LocationBottomDrawer;