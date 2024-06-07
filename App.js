import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DataList from './src/components/DataList';
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

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  // console.log(data)

  // useEffect(() => {
  //   getJsonData()

  //   .then(json => setData(json))

  // }, [])

  return (    
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Smart Cafeteria Menu</Text>
      <DataList />
      <Button
        title="Open Camera"
        onPress={() => navigation.navigate('CameraView')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
});
