import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useState } from "react";
import styles from "../component/style";
import { logout, updateUserDetails, deleteUser } from "../lib/supabaseCrud"; // Add deleteUser here

const LandingPage = ({ user, onLogout }: { user: { firstName: string; lastName: string; email: string }; onLogout: () => void }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);

    // Handle logout
    async function handleLogout() {
        await logout();
        onLogout();
    }

    // Handle submit to update user details
    async function handleSubmit() {
        try {
            const updated = await updateUserDetails(firstName, lastName, email);
            if (updated) {

                setFirstName(firstName);
                setLastName(lastName);
                setEmail(email);

                Alert.alert('Success', 'Your details have been updated!');
            } else {
                Alert.alert('Error', 'Failed to update your details.');
            }
        } catch (error) {
            console.error("Error updating user details:", error);
            Alert.alert('Error', 'An error occurred while updating.');
        }
    }

    // Handle delete user
    async function handleDeleteUser() {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await deleteUser();
                            if (result) {
                                Alert.alert('Success', 'Your account has been deleted.');
                                onLogout(); // Log out the user after deletion
                            }
                        } catch (error) {
                            console.error("Error deleting user:", error);
                            Alert.alert('Error', 'An error occurred while deleting your account.');
                        }
                    },
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, {firstName} {lastName}!
            </Text>

            {/* Text Inputs for editing details */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            {/* Submit button to confirm changes */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            {/* Logout button */}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>

            {/* Delete Account button */}
            <TouchableOpacity style={styles.button} onPress={handleDeleteUser}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LandingPage;
