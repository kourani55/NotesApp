import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f2f2f2',
        },
        headerTitleStyle: 
        { fontSize: 28, fontWeight: '600'},
        title: "My Notes"
      }}
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
