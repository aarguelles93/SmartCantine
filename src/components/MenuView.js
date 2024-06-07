import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import DataList from './DataList';

const MenuView = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Smart Cafeteria Menu</Text>
      <DataList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default MenuView;

