import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HttpService from '../services/HttpService';
import webServerUrl from '../configurations/webServer';

const Signup = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigateLogin = async () => {
        const signupURL = webServerUrl + "/signup";
        const method = 'POST';
        const data = {
            username: username,
            email: email,
            password: password,
        };
        const headers = {
            'ngrok-skip-browser-warning': 'true',
        }

        try {
            const response = await HttpService(method, signupURL, data, headers);
            console.log(response.status);
            if (response.status === 200) {
                console.log("Signup Successful");
                console.log(response.data);
                // Navigate to the Login screen or the main application screen
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.data.message);
            console.log(error);
            setUsername('');
            setEmail('');
            setPassword('');
        }
        navigation.navigate("Login");

    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Sign Up</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#fff"
                        style={styles.input}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#fff"
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <Pressable style={styles.submitButton} onPress={navigateLogin}>
                    <Text style={styles.submitButtonText}>SIGN UP</Text>
                </Pressable>
                <View style={styles.loginContainer}>
                    <Pressable onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
    loginContainer: {
        alignItems: 'center',
    },
    loginText: {
        color: '#ccc',
        fontSize: 12,
    },
});

export default Signup;
