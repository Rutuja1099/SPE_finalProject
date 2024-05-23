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

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraRollPer(status === "granted");
    };
    requestPermissions();
  }, []);

  const pickMedia = async () => {
    setDisableButton(true);
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
  };

  const toServer = async (mediaFile) => {
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
    console.log(response.headers);
    console.log(response.body);
  };

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
});

export default UserInput;
