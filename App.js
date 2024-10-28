import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import ProductDisplay from './screens/ProductDisplay';
import ProductDetailsScreen from './screens/ProductDetails';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
/**
 * The main app component, which renders a NavigationContainer with a Stack.Navigator.
 * The navigator has two screens: ProductDisplay and ProductDetails.
 * The header is hidden for both screens.
 */
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
