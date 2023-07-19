import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "./ui/PrimaryButton";
import { Colors } from "../../constants/Colors";
import MapView, { Marker } from "react-native-maps";

import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { GetLocationPreview } from "../util/http";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export default function GeoLocation({ setGetLocation }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isfocused = useIsFocused();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  function EmptyPickedLocation() {
    setPickedLocation(null);
    setGetLocation(null);
  }
  useEffect(() => {
    if (isfocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
      setGetLocation(mapPickedLocation);
    }
  }, [isfocused, route]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions");
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      const location = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      setGetLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      console.log("getLocationHandler", location);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  }

  function pickOnMap() {
    navigation.navigate("map");
  }

  return (
    <View>
      {pickedLocation !== null && pickedLocation.lat && pickedLocation.lng ? (
        <View style={styles.mapPreview}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: pickedLocation.lat,
              longitude: pickedLocation.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            userLocation={true}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker
              title="Picked Location"
              coordinate={{
                latitude: pickedLocation.lat,
                longitude: pickedLocation.lng,
              }}
            />
          </MapView>

          {/* <Image
            style={styles.map}
            source={{
              uri: GetLocationPreview(pickedLocation.lat, pickedLocation.lng),
            }}
          /> */}
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        <Text style={{ textAlign: "center", marginVertical: 5 }}>
          {pickedLocation === null ? "Add Location" : "Location"}
        </Text>
        {!pickedLocation !== null &&
        !pickedLocation?.lat &&
        !pickedLocation?.lng ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ margin: 5 }}>
              <PrimaryButton pressButton={getLocationHandler}>
                <Ionicons name="location" size={24} color={Colors.textLight} />
              </PrimaryButton>
            </View>
            <View style={{ margin: 5 }}>
              <PrimaryButton pressButton={pickOnMap}>
                <Ionicons name="map" size={24} color={Colors.textLight} />
              </PrimaryButton>
            </View>
          </View>
        ) : null}
      </View>
      {pickedLocation !== null && pickedLocation?.lat && pickedLocation?.lng ? (
        <PrimaryButton pressButton={EmptyPickedLocation}>
          <Ionicons name="trash" size={24} color={Colors.textLight} />
          Remove
        </PrimaryButton>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    height: 150,
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor:Colors.primaryNavIcon,
    borderRadius: 4,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 8,
    borderRadius:8
  },
});
