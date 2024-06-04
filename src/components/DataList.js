// src/components/DataList.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const dummyProducts = [
  { id: 1, category: 'Desert', name: 'Apple Pie', price: '15zl',tag:"apple-pie" },
  { id: 2, category: 'Desert', name: 'Suffle', price: '20zl',tag:"suffle" },
  { id: 3, category: 'Meat', name: 'Steak', price: '80zl',tag:"steak" },
  { id: 4, category: 'Meal', name: 'Doner', price: '35zl',tag:"doner" },

];


const DataList = () => {
  return (
    <View style={styles.container}>
      {dummyProducts.map((item) => (
        <View key={item.id} style={styles.card}>
           <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.text}>Price: {item.price}</Text>
          <Text style={styles.text}>Tag: {item.tag}</Text>
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
