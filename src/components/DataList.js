import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet ,Image} from 'react-native';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

// import {defaultimageUrl} from   './image500.png';
const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'restaurant/restaurant1/products'));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(items);
        console.log(items);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (

    <View style={styles.container}>
    {data.map((item) => (
      <View key={item.id} style={styles.card}>
         <Text style={styles.category}>{item.category}</Text>
         <Image
            source={{ uri: item.image_url ? item.image_url : '' }}
            style={styles.image}
          />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.text}> {item.price} zl</Text>
        {/* <Text style={styles.text}>{item.tag}</Text> */}
      </View>
    ))}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-start',
    flex: 1,
  },
  card: {
    backgroundColor: '#d0e8f2', // Light blue background
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.1, // for iOS
    shadowRadius: 8, // for iOS
  },
  image: {
    width: '100%', // Adjust the width as needed
    height: 200, // Adjust the height as needed
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
});

export default DataList;