import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import CameraMenu from './CameraView copy';
// import CameraMenu from './CameraView';
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
          name="CameraMenu" 
          component={CameraMenu} 
          options={{ title: 'Camera Menu' }} 
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
        onPress={() => navigation.navigate('CameraMenu')}
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
