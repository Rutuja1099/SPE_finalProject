import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet,Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FS from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';
import webServerUrl from '../configurations/webServer';
import { useNavigation } from '@react-navigation/native';

const UserInput = ({ route }) => {
  const { username } = route.params;
  const [cameraRollPer, setCameraRollPer] = useState(null);
  const [disableButton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  // const [counts, setCounts] = useState(null);
  // const [vehicleCounts, setVehicleCounts] = useState(null);
  // const [vehicleCounts, setVehicleCounts] = useState([
  //   { key: 'in', value: 0 },
  //   { key: 'out', value: 0 },
  //   { key: 'by_class_in', value: {} },
  //   { key: 'by_class_out', value: {} },
  // ]);


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
    const responseObject = JSON.parse(response.body); // Corrected this line
    console.log("responseObject.........",responseObject)
    // Accessing properties
    const byClassIn = responseObject.by_class_in;
    const byClassOut = responseObject.by_class_out;
    const inCount = responseObject.in;
    const outCount = responseObject.out;

    console.log("By Class In:", byClassIn);
    console.log("By Class Out:", byClassOut);
    console.log("In Count:", inCount);
    console.log("Out Count:", outCount);
    console.log(" in_bus: byClassIn.bus", byClassIn.bus)
    console.log("username: username", username);
    // setVehicleCounts(updatedCounts);
    const addDataURL = webServerUrl + "/addData";
        const method = 'POST';
        const data = {
            username: username,
            in_bus: byClassIn.bus, // Assuming username is defined somewhere in your code
            in_car: byClassIn.car,
            in_motorcycle:byClassIn.motorcycle,
            in_truck:byClassIn.truck,
            out_bus: byClassOut.bus, // Assuming username is defined somewhere in your code
            out_car: byClassOut.car,
            out_motorcycle:byClassOut.motorcycle,
            out_truck:byClassOut.truck,
            in_total: inCount,
            out_total:outCount
        };
        const headers = {
            'ngrok-skip-browser-warning': 'true',
        }
        try {
          const response = await HttpService(method, addDataURL, data,headers);
          console.log(response.status);
          if (response.status === 200) {
              console.log("Successful");
              console.log(response.data);
              try {
                  // Handle success
              } catch (error) {
                  console.log("error while saving data");
                  console.log(error);
              }
          } else {
              alert(response.data.message);
          }
      } catch (error) {
          alert(error.data.message);
          console.log(error);
      }
    // Show alert with an "OK" button that navigates to the next screen
    Alert.alert(
      'Upload Successful',
      'Video has been processed successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to the VehicleCountsScreen and pass the vehicleCounts data
            navigation.navigate("VehicleCountsScreen", { responseObject, username });
          },
        },
      ]
    );
  
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
         {/* <Text style={styles.vehicleCount}>{vehicleCounts}</Text> */}
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
