import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FS from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';
import webServerUrl from '../configurations/webServer';

const UserInput = () => {
  const [cameraRollPer, setCameraRollPer] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [counts, setCounts] = useState(null);
  const [vehicleCounts, setVehicleCounts] = useState(null);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraRollPer(status === "granted");
    };
    requestPermissions();
  }, []);

  const pickMedia = async () => {
    setDisableButton(true);
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.canceled) {
      const mediaFile = {
        type: result.assets[0].type,
        base64: result.assets[0].base64,
        uri: result.assets[0].uri,
      };
      await toServer(mediaFile);
    }
    setLoading(false);
    setDisableButton(false);
  };

  const toServer = async (mediaFile) => {
    try {
    let type = mediaFile.type;
    let route = "";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    url = webServerUrl + route;
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
        'ngrok-skip-browser-warning': 'true',
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    console.log("response..............",response);
    //const result = await response.text();
    // if (response.ok) {
    //   setVehicleCounts(result);
    //   Alert.alert("Upload Successful", "Video has been processed successfully.");
    // } else {
    //   Alert.alert("Upload Failed", result.message || "Something went wrong.");
    // }
  }
  catch (error) {
    console.error("Error uploading video:", error);
    Alert.alert("Upload Error", "Failed to upload the video.");
  }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickMedia} disabled={!cameraRollPer || disableButton}>
        <View style={styles.iconContainer}>
          <Icon name="upload" color={"white"} size={40} />
        </View>
        {cameraRollPer ? (
          <Text style={styles.uploadText}>Upload your video</Text>
         
        ) : (
          <Text style={styles.permissionText}>Camera Roll Permission Required!</Text>
        )}
         <Text style={styles.vehicleCount}>{vehicleCounts}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343232',
  },
  iconContainer: {
    marginBottom: 14,
    alignSelf: 'center',
  },
  uploadText: {
    fontSize: 18,
    color: 'white',
  },
  permissionText: {
    color: 'red',
  },
  vehicleCount:{
    fontSize:24,
    color:'white',
  }
});

export default UserInput;
