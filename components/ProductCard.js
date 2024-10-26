// src/components/ProductCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Function to calculate delivery information based on provider and TAT (Turnaround Time)
const calculateDeliveryDate = (provider, TAT) => {
  const today = new Date();
  
  if (provider === "Provider A" && today.getHours() < 17) {
    return "Same-Day Delivery (Order by 5 PM)";
  } else if (provider === "Provider B" && today.getHours() < 9) {
    return "Same-Day Delivery (Order by 9 AM)";
  } else if (provider === "Provider B") {
    return "Next-Day Delivery";
  } else if (provider === "General Partners") {
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + TAT);
    return `Delivery within ${TAT} days`;
  }

  return "Delivery Unavailable";
};

// ProductCard component for displaying individual product information
const ProductCard = ({ product, pincodeData }) => {
  const { productName, price, inStock } = product;
  const deliveryInfo =
    pincodeData[0] &&
    calculateDeliveryDate(pincodeData[0].provider, pincodeData[0].TAT);

  return (
    <View style={styles.card}>
      <Text style={styles.productName}>{productName}</Text>
      <Text>Price: ${price.toFixed(2)}</Text>
      <Text>Stock: {inStock ? "Available" : "Out of Stock"}</Text>
      <Text>Delivery: {deliveryInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductCard;