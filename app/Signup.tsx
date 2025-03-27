import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { getUserInfo, signUp, addUserDetails } from "../lib/supabaseCrud";
import styles from "../component/style";
interface SignupProps {
    onBackToLogin: () => void,
    onLoginSuccess: (user: { firstName: string; lastName: string, email: string }) => void;

}

const Signup = ({ onBackToLogin, onLoginSuccess }: SignupProps) => {
    const TESTING = ""//TODO REMOVE THIS 
    const [firstName, setFirstName] = useState(TESTING);
    const [lastName, setLastName] = useState(TESTING);
    const [email, setEmail] = useState(TESTING);
    const [password, setPassword] = useState(TESTING);

    const handleSignUp = async () => {

        var user = await signUp(email, password);


        // @ts-ignore
        const userId = user.id;

        if (userId) {

            await addUserDetails(userId, firstName, lastName, email);

            const user = await getUserInfo();
            onBackToLogin();

            if (user == false) {
                Alert.alert("Error", "User was deleted, create a new account");
                return;
            }



            // @ts-ignore
            onLoginSuccess({ firstName: user.firstName, lastName: user.lastName, email: email });


        };
    }




    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                value={firstName}
                onChangeText={setFirstName}
                placeholder="First Name"
                placeholderTextColor="#ccc"
                style={styles.input}
            />
            <TextInput
                value={lastName}
                onChangeText={setLastName}
                placeholder="Last Name"
                placeholderTextColor="#ccc"
                style={styles.input}
            />
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
                Already have an account?{" "}
                <Text onPress={onBackToLogin} style={styles.link}>
                    Login
                </Text>
            </Text>
        </View>
    );
};


export default Signup;