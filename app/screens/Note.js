import { 
    StyleSheet,
    Text,
    View,
    Navigation,
    SafeAreaView,
    TextInput,
    Button,
    TouchableOpacity } from "react-native";
import { useState } from "react";
import HomeScreen from "./HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "@react-navigation/native";



export default function Note(props) {

    const [messageInfo, setMessagInfo] = useState("");
    const [message, setMessage] = useState("");
    console.log(message);

    const getNote = async () => {
        try {
          const savedNote = await AsyncStorage.getItem('@message');
          const currNote = JSON.parse(savedNote);
          console.log(currNote);
        } catch (error) {
          console.log(error);
        }
      };
      
    //const getData = async () => {
    //    const message = await AsyncStorage.getItem('@message');
   //     setMessagInfo(JSON.parse(message));
   // }

    const saveMessage = async () => {
        const messageToSave = {
          message: message,
        };
        
        await AsyncStorage.setItem('@message', JSON.stringify(messageToSave));
        setMessagInfo(messageToSave);
      }
      
    
   return(
        <SafeAreaView style={styles.container}>
            <Text>Saved Note:</Text>
            {messageInfo ? <Text>{messageInfo.message}</Text> : <Text>nothin</Text>}
            <TextInput
            onChangeText={setMessage} placeholder='Kore WA PEN DESU' value={message}/>
    
            <TouchableOpacity onPress={saveMessage}>
            <Text style={styles.appButtonContainer}>{"Save"}</Text>
            <Link
            to={{
            pathname: "./HomeScreen",
            state: getNote }} // your data array of objects 
            ></Link>
            </TouchableOpacity>
          
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
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
      }
});