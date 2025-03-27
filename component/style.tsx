import { StyleSheet } from "react-native";
// Styles
const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#121212",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: 300,
        alignItems: "center",
    },
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff",
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 5,
        marginBottom: 10,
        color: "#fff",
        backgroundColor: "#222",
    },
    button: {
        marginTop: 10,
        width: "100%",
        backgroundColor: "#333",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    text: {
        marginTop: 10,
        fontSize: 14,
        color: "#ccc",
    },
    link: {
        color: "#4A90E2",
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
});

export default styles;
