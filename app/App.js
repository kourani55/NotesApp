import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import NewNoteScreen from './screens/NewNoteScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{title: "Home"}}
    />
    <Stack.Screen
      name="NewNoteScreen"
      component={NewNoteScreen}
      options={{title: "New Note"}}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}