import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const NewNoteScreen = ({ navigation, route }) => {
  
  const [text, setText] = useState(route.params?.note?.text || '');
  const [title, setTitle] = useState(route.params?.note?.title || '');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  
  const index = route.params?.index;
  
  const handleSaveNote = async () => {
  const note = {
    title,
    text,
    date: new Date(),
    index, // pass the index to the note object
    isBold,
    isItalic,
    fontSize
  };
  
  
  // get existing notes from storage
  const existingNotes = JSON.parse(await AsyncStorage.getItem('@notes')) || [];

  if (index !== undefined) {
    // update existing note
    existingNotes[index] = note;
    console.log(existingNotes);
  } else {
    // add new note
    existingNotes.push(note);
    
  }

  //saves updated notes
  await AsyncStorage.setItem('@notes', JSON.stringify(existingNotes));

  //send updated note to homescreen
  route.params?.onSave?.(note);
  console.log("Note saved!");
  navigation.goBack();
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
      
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Your Note Title"
        style={[
          styles.titleInput,
          { marginTop: 80 },
        ]}
        //autoFocus
      />

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Start typing..."
        style={[
          styles.input, 
          isBold && styles.boldText, 
          isItalic && styles.italicText, 
          { fontSize },
          { marginTop: 10},
        ]}
        multiline
        //autoFocus
      />
      <View style={styles.formattingBar}>
        <TouchableOpacity
          style={[
            styles.formattingButton, 
            isBold && styles.activeFormattingButton
          ]}
          onPress={handleToggleBold}
        >
          <Text style={[
            styles.formattingButtonText, 
            isBold && styles.activeFormattingButtonText
            ]}>B</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.formattingButton, 
            isItalic && styles.activeFormattingButton
          ]}
          onPress={handleToggleItalic}
        >
          <Text style={[
            styles.formattingButtonText, 
            isItalic && styles.activeFormattingButtonText
            ]}>I</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.formattingButton, 
            fontSize === 18 && styles.activeFormattingButton
          ]}
          onPress={() => handleChangeFontSize(18)}
        >
          <Text style={[
            styles.formattingButtonText, 
            fontSize === 18 && styles.activeFormattingButtonText
            ]}>A</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.formattingButton, 
            fontSize === 24 && styles.activeFormattingButton
          ]}
          onPress={() => handleChangeFontSize(24)}
        >
          <Text style={[
            styles.formattingButtonText, 
            fontSize === 24 && styles.activeFormattingButtonText
            ]}>A</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.formattingButton, 
            fontSize === 30 && styles.activeFormattingButton
          ]}
          onPress={() => handleChangeFontSize(30)}
        >
          <Text style={[
            styles.formattingButtonText, 
            fontSize === 30 && styles.activeFormattingButtonText
            ]}>A</Text>
        </TouchableOpacity>
      </View>


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
    backgroundColor: '#f8deaa',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#5A5A5A',
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
    backgroundColor: '#F2F2F2',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  formattingButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#5A5A5A',
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  activeFormattingButton: {
    backgroundColor: '#606060',
  },
  activeFormattingButtonText: {
    color: '#FFFFFF',
  },
  notePreview: {
    marginBottom: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleInput: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

export default NewNoteScreen;