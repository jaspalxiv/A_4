"use Client"
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../component/style";
import { login, getUserInfo } from "../lib/supabaseCrud";


interface LoginProps {
    onSignupClick: () => void;
    onLoginSuccess: (user: { firstName: string; lastName: string,  email: string }) => void;
}

const Login = ({ onSignupClick, onLoginSuccess }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        const status = await login(email, password);
        if (status) {
            const user = await getUserInfo();

            if(user == false){
                Alert.alert("Error", "User was deleted, create a new account");
                return;
            }

            // @ts-ignore
            onLoginSuccess({ firstName: user.firstName, lastName: user.lastName, email: email });
        } else {
            Alert.alert("Login Failed", "Invalid email or password.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#ccc"
                style={styles.input}
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                style={styles.input}
            />
            <View style={styles.checkboxContainer}>
                <Text style={styles.text}>Remember me</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                Don't have an account?{" "}
                <Text onPress={onSignupClick} style={styles.link}>
                    Sign Up
                </Text>
            </Text>
        </View>
    );
};

export default Login;