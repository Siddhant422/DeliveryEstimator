import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import ProductDisplay from './components/ProductDisplay';

const App = () => {
  return (
    <View style={styles.mainContainer}>
      <ProductDisplay/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  }
})