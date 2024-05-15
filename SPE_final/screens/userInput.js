import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useState ,useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
// import {ImagePicker} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import * as FS from "expo-file-system";
// import {Camera} from"react-native-pytorch-core";
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

  uriToBase64 = async (uri) => {
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };
    

    const pickMedia = async () => {
      setDisableButton(true);
      console.log("rutuujaaaa1");
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        const mediaFile = {
          type: result.type,
          base64: result.base64,
          uri: result.uri,
        };
        console.log("rutuuja");
        await toServer(mediaFile);
      }
      // setDisableButton(false);
    };

    toServer = async (mediaFile) => {
      let type = mediaFile.type;
      console.log("type", type);
      // let schema = "http://";
      // let host = "192.168.1.6";
      let route = "";
      // let port = "5000";
      let url = "";
      let content_type = "";
      type === "image"
        ? ((route = "/image"), (content_type = "image/jpeg"))
        : ((route = "/video"), (content_type = "video/mp4"));
      url = webServerUrl + route;
  
      let response = await FS.uploadAsync(url, mediaFile.uri, {
        headers: {
          "content-type": content_type,
        },
        httpMethod: "POST",
        uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
      });
  
      console.log(response.headers);
      console.log(response.body);
    };
    
   

        // ImagePicker.launchImageLibrary(options, (response) => {
        //     if (response.didCancel) {
        //       console.log('User cancelled image picker');
        //     } else if (response.error) {
        //       console.log('ImagePicker Error: ', response.error);
        //     } else if (response.customButton) {
        //       console.log('User tapped custom button: ', response.customButton);
        //     } else {
        //       const source = { uri: response.uri };
        //       this.setState({
        //         avatarSource: source,
        //       });
        //     }
        //   })
        // }

    return(
        <View className=" bg-[#343232] flex-1 justify-center items-center">
            <View className="border-2 border-white rounded-3xl px-14 py-20">
              <TouchableOpacity onPress={pickMedia} disabled={!cameraRollPer || disableButton}>
                <View className="mb-14 self-center">
                <Icon name="upload" color={"white"} size={40} />
                </View>
                {cameraRollPer ? (
                  // <Camera className="absolute"/>
                  <Text style={{ fontSize: 18, color: 'white' }}>Upload your video</Text>
                ) : (
                  <Text>Camera Roll Permission Required!</Text>
                )}
              </TouchableOpacity>
            </View>
        </View>
    )
}

export default UserInput;