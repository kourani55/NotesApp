import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native";

export default function Note() {
    const [message, setMessage] = useState("");
    return(
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="enter your kore wa pen desu here"
                value={message}
                onChangeText={(text) => setMessage(text)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: 400,
    },
});