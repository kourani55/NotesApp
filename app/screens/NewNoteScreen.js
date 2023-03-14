import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const NewNoteScreen = ({ navigation, route }) => {
  
  const [text, setText] = useState(route.params?.note?.text || '');
  const [title, setTitle] = useState(route.params?.note?.title || '');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  
  const handleSaveNote = async () => {
    const note = {
      title,
      text,
      date: new Date(),
    };
    
    // get existing notes from storage
    const existingNotes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];

    if (route.params?.note) {
      const index = route.params.note.index;
      existingNotes[index] = note;
      
    } else {
      existingNotes.push(note);
      //console.log("ElseexistingNote: ", note)
    }

    //saves updated notes
    await AsyncStorage.setItem('@notes', JSON.stringify(existingNotes));

    //send updated note to homescreen
    route.params?.onSave?.(note);
    console.log("NewNoteScreen Pass: ", note);
    navigation.navigate('HomeScreen');
  };

  const handleToggleBold = () => {
    setIsBold(!isBold);
  };

  const handleToggleItalic = () => {
    setIsItalic(!isItalic);
  };

  const handleChangeFontSize = (size) => {
    setFontSize(size);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formattingBar}>
        <TouchableOpacity
          style={[styles.formattingButton, isBold && styles.activeFormattingButton]}
          onPress={handleToggleBold}
        >
          <Text style={[styles.formattingButtonText, isBold && styles.activeFormattingButtonText]}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formattingButton, isItalic && styles.activeFormattingButton]}
          onPress={handleToggleItalic}
        >
          <Text style={[styles.formattingButtonText, isItalic && styles.activeFormattingButtonText]}>I</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formattingButton, fontSize === 18 && styles.activeFormattingButton]}
          onPress={() => handleChangeFontSize(18)}
        >
          <Text style={[styles.formattingButtonText, fontSize === 18 && styles.activeFormattingButtonText]}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formattingButton, fontSize === 24 && styles.activeFormattingButton]}
          onPress={() => handleChangeFontSize(24)}
        >
          <Text style={[styles.formattingButtonText, fontSize === 24 && styles.activeFormattingButtonText]}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formattingButton, fontSize === 30 && styles.activeFormattingButton]}
          onPress={() => handleChangeFontSize(30)}
        >
          <Text style={[styles.formattingButtonText, fontSize === 30 && styles.activeFormattingButtonText]}>A</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter note title"
        style={[styles.titleInput, isBold && styles.boldText, isItalic && styles.italicText, { fontSize }]}
        multiline
        autoFocus
      />
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter note text"
        style={[styles.input, isBold && styles.boldText, isItalic && styles.italicText, { fontSize }]}
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
  formattingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  formattingButton: {
    backgroundColor: '#EFEFEF',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  formattingButtonText: {
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  activeFormattingButton: {
    backgroundColor: '#D0D0D0',
  },
  activeFormattingButtonText: {
    color: '#FFFFFF',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    },
    titleInput: {
    fontWeight: 'bold',
    fontSize: 24,
    },
    
});

export default NewNoteScreen;