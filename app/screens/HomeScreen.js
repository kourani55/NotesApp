import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, TouchableOpacity, Text, TextInput } from "react-native";
import Note from './Note';
import { Link } from '@react-navigation/native';




export default function HomeScreen({navigation}) {
    
    const onPress = () => navigation.navigate("Note");

    return(
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>{"New Note"}</Text>
        </TouchableOpacity>

        
            <StatusBar style='auto' />
            </View>

             );}



const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontSize: "50px",
        alignItems: 'center',
        justifyContent: 'center',
    },

    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      noteButton: {
        elevation: 8,
        backgroundColor: "#fff",
        paddingVertical: 25,
        paddingHorizontal: 25,
  
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      

   
});

