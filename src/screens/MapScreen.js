import { useNavigation } from "@react-navigation/native";
import React, {
  useCallback,
  useLayoutEffect,
  useState,
  useEffect,
} from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import IconButton from "../components/ui/IconButton";

export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: latitude, lng: longitude });
  }

  const savedPickedLocationHandler = useCallback(() => {
    if (selectedLocation == null) {
      Alert.alert(
        "No location Picked",
        "Picked a location on tapping map first!"
      );
      return;
    }

    navigation.navigate("ManageExpenses", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          pressButton={savedPickedLocationHandler}
        />
      ),
    });
  }, [navigation, savedPickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      onPress={selectLocationHandler}
      initialRegion={region}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
