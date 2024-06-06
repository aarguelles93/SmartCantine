// MenuView.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DataList from './DataList';

const MenuView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Smart Cafeteria Menu</Text>
      <DataList />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default MenuView;
