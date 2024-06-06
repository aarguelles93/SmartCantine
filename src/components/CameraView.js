import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { uploadPicture } from './firebase-config';

export default function CameraView() {
  const [image, setImage] = useState(null);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [progress, setProgress] = useState(0);

  // Camera permissions are still loading
  if (!permission) {
    return <View />;
  }

  // Camera permissions are not granted yet
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleImagePicking = async (fn) => {
    try {
      const response = await fn({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });

      if (!response.canceled) {
        const { uri } = response.assets[0];

        setImage(uri);
        const fileName = uri.split('/').pop();
        const result = await uploadPicture(uri, fileName, (v) =>
          setProgress(v)
        );
        console.log(result);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while uploading the image');
    }
  };

  const pickImage = () => handleImagePicking(ImagePicker.launchImageLibraryAsync);
  const handleObturatorPress = () => handleImagePicking(ImagePicker.launchCameraAsync);

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.buttonText}>{progress.toFixed(2) + '%'}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleObturatorPress}>
          <Text style={styles.buttonText}>Obturator</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 64,
  },
  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: '#DDDDDD',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.75,
  },
});
