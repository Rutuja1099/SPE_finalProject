import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import {ImagePicker} from 'react-native-image-picker';
// import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';



const UserInput = () => {

    const options = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
    };
      
    const handleChooseVideo = () => {
        // launchImageLibrary({ mediaType: 'photo' }, (response) => {
        //   if (!response.didCancel) {
        //     // Handle the selected video
        //     console.log(response);
        //   }
        // });


        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                avatarSource: source,
              });
            }
          })
        }

    return(
        <View className=" bg-[#343232] flex-1 justify-center items-center">
            <View className="border-2 border-white rounded-3xl px-14 py-20">
                <View className="mb-14 self-center">
                    <Icon name="upload" color={"white"} size={40} onPress={handleChooseVideo} />
                </View>
            
                {/* <Icon icon={"arrow-up-from-bracket"} size={32} color="white" /> */}
                <Text onPress={handleChooseVideo} className="text-lg text-white">Upload your video</Text>
            </View>
        </View>
    )
}

export default UserInput;