import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "./ui/PrimaryButton";
import { Colors } from "../../constants/Colors";

export default function ImagePickerComponent({ setGetImage }) {
  const [pickedImage, setPickedImage] = useState(null);

  useEffect(() => {
    requestMediaLibraryPermissions();
  }, []);

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "Media library permission denied."
      );
    }
  };
  const pickImageFromGallery = async () => {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
      setGetImage(image.assets[0].uri);
    }
  };

  const takeImageHandler = async () => {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
      setGetImage(image.assets[0].uri);
    }
  };
  function EmptyPickedImage() {
    setPickedImage(null);
    setGetImage(null);
  }
  return (
    <View>
      {pickedImage ? (
        <View style={styles.imagePreview}>
          <Image style={styles.image} source={{ uri: pickedImage }} />
        </View>
      ) : null}

      <View style={styles.buttonContainer}>
        <Text style={{ textAlign: "center", marginVertical: 5 }}>
          {pickedImage === null ? "Add Reciept/Bill" : "Reciept/Bill"}
        </Text>
        {pickedImage === null ? (
          <View style={{ flexDirection: "row" }}>
            <View style={{ margin: 5 }}>
              <PrimaryButton pressButton={pickImageFromGallery}>
                <Ionicons name="images" size={24} color={Colors.textLight} />
              </PrimaryButton>
            </View>
            <View style={{ margin: 5 }}>
              <PrimaryButton pressButton={takeImageHandler}>
                <Ionicons name="camera" size={24} color={Colors.textLight} />
              </PrimaryButton>
            </View>
          </View>
        ) : null}
      </View>

      {pickedImage ? (
        <PrimaryButton pressButton={EmptyPickedImage}>
          <Ionicons name="trash" size={24} color={Colors.textLight} />
          Remove
        </PrimaryButton>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    height: 150,
    width: "100%",
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.primaryNavIcon,
  },
  image: {
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
