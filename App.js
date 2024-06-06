import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import MenuView from './src/components/MenuView'
import CameraView from './src/components/CameraView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Home' }} 
        />
        <Stack.Screen 
          name="CameraView" 
          component={CameraView} 
          options={{ title: 'Camera Menu' }} 
        />
          <Stack.Screen 
          name="MenuView" 
          component={MenuView} 
          options={{ title: 'Menu Page' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

async function getJsonData() {
  const response =await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  return response.data
}

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  console.log(data)

  useEffect(() => {
    getJsonData()

    .then(json => setData(json))

  }, [])

  return (    
    <View style={styles.container}>
      <Button
        title="Open Camera"
        onPress={() => navigation.navigate('CameraView')}
      />
       <Button
        title="Open Menu"
        onPress={() => navigation.navigate('MenuView')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
