//import { ImagePicker } from 'expo-image-picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraView() {
  // const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  // Camera permissions are still loading
  if (!permission) {    
    return <View />;
  }

  // Camera permissions are not granted yet
  if (!permission.granted) {    
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  // function toggleCameraType() {
  //   setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  // }
  
  const handleObturatorPress = async() => {
    const cameraResponse = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!cameraResponse.cancelled) {
      console.log(cameraResponse.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />} */}
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleObturatorPress}>
            <Text style={styles.buttonText}>Obturator</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
