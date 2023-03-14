import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native';
import NewNoteScreen from './screens/NewNoteScreen';
import HomeScreen from './screens/HomeScreen';
import { StyleSheet } from 'react-native';

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
      options={{  
        
        headerShown: true,
        headerBackTitleVisible: false,
        headerTransparent: true,
        title: 'Notes',
        headerTintColor: "#ccc",
        headerTitleAlign: 'left',
     }}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
