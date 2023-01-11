import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Note from './screens/Note';
import { SafeAreaView } from 'react-native';

console.log('HomeScreen', HomeScreen);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{title: "HomeScreen"}}
    />
    <Stack.Screen
      name="Note"
      component={Note}
      options={{title: "Note"}}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}