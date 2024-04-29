import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-web';
import { useState } from 'react';

const Login = () => {


    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigateMain = () => {
        navigation.navigate("UserInput");
    }

    return (
        
        <View className = "bg-[#343232] flex-1 justify-center items-center">
            
            <View className="text-white border-2 border-white rounded-3xl px-8 py-16">
                <View className="flex items-center mb-8">
                    <Text className="text-white text-3xl">JADE</Text>
                </View>

                <View>
                    <TextInput
                        placeholder = "Username"
                        placeholderTextColor="#fff"
                        className = "border-b-2 border-white pl-2 mb-6 w-56 text-white"
                        onChangeText={(text) => setUsername(text)}
                    />
                    <TextInput
                        placeholder = "Password"
                        placeholderTextColor="#fff"
                        className = "border-b-2 border-white pl-2 mb-2 text-white"
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <View className="flex mb-5">
                    <Pressable className="flex">
                        <Text className=" text-stone-400 text-xs self-end">Forgot Password?</Text>
                    </Pressable>
                </View>

                <Pressable className = "flex self-center bg-cyan-500 px-9 py-2 rounded-3xl w-48" onPress={()=>navigateMain()}>
                    <Text className="text-black text-xl self-center">SUBMIT</Text>
                </Pressable>
                <Pressable className="flex justify-center items-center mt-2">
                    <Text className="text-stone-400 text-xs">Don't have an account? Sign up</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Login;