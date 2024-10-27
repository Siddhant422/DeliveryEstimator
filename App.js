import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import ProductDisplay from './components/ProductDisplay';
import ProductDetailsScreen from './components/ProductDetails';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer style={styles.mainContainer}>
      <Stack.Navigator>
      <Stack.Screen  options={{headerShown: false}} name="ProductDisplay" component={ProductDisplay} />
      <Stack.Screen  options={{headerShown: false}} name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: '100%',
  },
});
