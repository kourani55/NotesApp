import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import moment from 'moment/moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@notes');
      if (jsonValue != null) {
        setNotes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveNotes = async (newNotes) => {
    try {
      const jsonValue = JSON.stringify(newNotes);
      await AsyncStorage.setItem('@notes', jsonValue);
      setNotes([...newNotes]); // update notes state by creating a new array
    } catch (e) {
      console.log(e);
    }
  };

  const handleNewNote = () => {
    navigation.navigate('NewNoteScreen', { onSave: handleSaveNote });
  };

  const handleSaveNote = (note) => {
    const index = note.index;
    const newNotes = [...notes];
    if (index !== undefined) {
      // update existing note
      newNotes[index] = note;
    } else {
      // add new note
      newNotes.push(note);
    }
    saveNotes(newNotes);
  };

  const handleEditNote = (note, index) => {
    navigation.navigate('NewNoteScreen', { onSave: handleSaveNote, note, index });
  };
  
  const handleDeleteNote = (index) => {
    const newNotes = [...notes];
    newNotes.splice(index, 1);
    saveNotes(newNotes);
  };

  const renderNote = ({ item, index }) => {
    const formattedDate = moment(item.date).format('LLL');

    return (
      <View style={styles.noteContainer}>
        <TouchableOpacity onPress={() => handleEditNote(item, index)} style={styles.noteTextContainer}>
          <Text style={styles.noteText}>{item.title}</Text>
          <Text style={styles.noteDate}>{formattedDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteNote(index)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity style={styles.noteButton} onPress={handleNewNote}>
        <Text style={styles.noteButtonText}>New Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  noteTextContainer: {
    flex: 1,
  },
  
  noteText: {
    fontSize: 18,
  },
  noteDate: {
    fontSize: 12,
    color: '#999999',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  noteButton: {
        backgroundColor: '#f8deaa',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: 'black',
        shadowOffset: {height: 2, width: 0.5},
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 3, 
  },
  noteButtonText: {
        fontWeight: '500',
        color: 'black',
        fontSize: 16,
  },
});

