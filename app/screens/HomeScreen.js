import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View } from "react-native";


export default function HomeScreen({navigation}) {
    return(
    <View style={styles.container}>
        <View style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
        <Button title="Note" 
        onPress={() => navigation.navigate("Note")}
         />
            </View>
        </View>
        <StatusBar style='auto' />
    </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#f8eadd',
        fontSize: "50px",
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 200,
        backgroundColor: "#fff",
    },

    //button
    buttonStyle: {
        paddingLeft: 10,
        // move left or right
        width: 145, 
        height: 50,
        alignItems: 'center',
        position: 'absolute',
        bottom: 30,
    },
   
});

