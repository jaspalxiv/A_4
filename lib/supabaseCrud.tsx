import { Alert } from "react-native";
import supabase from "./supabase";


async function isLogged() {
    const { data: data, error } = await supabase.auth.getUser();

    if (error) {
        return error;
    } else {
        return data.user.id;
    }
}


async function login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.log("Error during sign-in:", error.message);
        return false;
    }

    return true;
}

async function logout() {
    await supabase.auth.signOut();
}

async function getUserInfo() {
    const { data, error: signUpError } = await supabase.from("user_details").select("").single();
    if (signUpError) {
        return false;
    }
    return data;
}

async function signUp(email: string, password: string) {
    const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
    });

    if (signUpError) {
        Alert.alert('Sign Up Error', signUpError.message);
        return signUpError.message;
    }
    return data.user;
}

async function addUserDetails(uuid: string, firstName: string, lastName: string, email: string) {

    const { data: insertData, error: insertError } = await supabase
        .from('user_details')
        .insert([
            {
                uuid: uuid,
                firstName: firstName,
                lastName: lastName,
                email: email,
            },
        ]);




    if (insertError) {
        console.log(insertError);
        Alert.alert('Error', insertError.message);
        return insertError.message;
    }

    return;
}

async function updateUserDetails(firstName: string, lastName: string, email: string) {
    const id = await isLogged()

    const { error } = await supabase
        .from('user_details')
        .update({ firstName, lastName, email })
        .eq('uuid', id);


    if (error) {
        console.error("Error updating user details:", error.message);
        return false;
    }
    return true;
}

async function deleteUser() {
    const id = await isLogged()

    const { error } = await supabase
        .from('user_details')
        .delete()
        .eq('uuid', id);

    if (error) {
        console.error('Error deleting user:', error.message);
        Alert.alert('Error', 'An error occurred while deleting.');
        return false;
    } else {
        console.log('User deleted successfully!');
        return true;
    }

}
export { login, isLogged, getUserInfo, signUp, addUserDetails, logout, updateUserDetails, deleteUser };