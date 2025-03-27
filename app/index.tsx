"use Client"
import { View } from "react-native";
import { useState } from "react";
import styles from "../component/style";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";


// Main AuthPage Component
const AuthPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);

    return (
        <View style={styles.page}>
            {user ? (
                <LandingPage user={user} onLogout={() => setUser(null)} />
            ) : isSignup ? (
                <Signup onBackToLogin={() => setIsSignup(false)}  onLoginSuccess={setUser} />
            ) : (
                <Login onSignupClick={() => setIsSignup(true)} onLoginSuccess={setUser} />
            )}
        </View>
    );
};

export default AuthPage;