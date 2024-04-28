import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import {ImagePicker} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserInput = () => {
    const handleChooseVideo = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
          if (!response.didCancel) {
            // Handle the selected video
            console.log(response);
          }
        });
      };
      
    return(
        <View className=" bg-[#343232] flex-1">
        <View className="flex-1 justify-center text-center">
            <View className="ml-40 mb-4">
            <Icon name="upload" color={"white"} size={40} onPress={handleChooseVideo} />
            </View>
           
            {/* <Icon icon={"arrow-up-from-bracket"} size={32} color="white" /> */}
            <Text onPress={handleChooseVideo} className="text-lg text-white ml-28">Upload your video</Text>
        </View>
        </View>
    )
}

export default UserInput;