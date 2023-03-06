import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NewNoteScreen = ({ navigation, route }) => {
  const [text, setText] = useState(route.params?.note?.text || '');

  const handleSaveNote = async () => {
    
    const note = {
      text,
      date: new Date(),
    };

    // get existing notes from storage
    const existingNotes = JSON.parse(await AsyncStorage.getItem('notes')) || [];

    if (route.params?.note) {
      const index = route.params.note.index;
      existingNotes[index] = note;
    } else {
      existingNotes.push(note);
    }

    //saves updated notes
    await AsyncStorage.setItem('notes', JSON.stringify(existingNotes));

    //send updated note to homescreen
    route.params?.onSave?.(note);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter note text"
        style={styles.input}
        multiline
        autoFocus
      />
     <TouchableOpacity style={styles.button} onPress={handleSaveNote}>
  <Text style={styles.buttonText}>Save Note</Text>
</TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    input: {
      flex: 1,
      fontSize: 18,
      textAlignVertical: 'top',
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    buttonText: {
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  

export default NewNoteScreen;