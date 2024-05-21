import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HttpService from '../services/HttpService';
import webServerUrl from '../configurations/webServer';

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigateMain = async () => {
        const loginURL = webServerUrl + "/";
        const method = 'GET';
        const data = null;

        try {
            const response = await HttpService(method, loginURL, data);
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
            setUsername('');
            setPassword('');
        }
        navigation.navigate("UserInput");
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Dhole</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#fff"
                        style={styles.input}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        style={styles.input}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={styles.forgotPasswordContainer}>
                    <Pressable>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.submitButton} onPress={navigateMain}>
                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                </Pressable>
                <View style={styles.signupContainer}>
                    <Pressable>
                        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#343232',
    },
    formContainer: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoText: {
        color: '#fff',
        fontSize: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: '#fff',
        marginBottom: 10,
        color: '#fff',
        fontSize: 16,
    },
    forgotPasswordContainer: {
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: '#ccc',
        fontSize: 12,
    },
    submitButton: {
        backgroundColor: '#00bcd4',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 10,
    },
    submitButtonText: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
    },
    signupContainer: {
        alignItems: 'center',
    },
    signupText: {
        color: '#ccc',
        fontSize: 12,
    },
});

export default Login;
