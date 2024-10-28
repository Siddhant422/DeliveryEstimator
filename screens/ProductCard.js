import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const SCREEN_PADDING = 16;
const NUM_COLUMNS = 2;
const CARD_MARGIN = 8;

// Calculate card width based on screen width, padding, and margins
const cardWidth = (Dimensions.get('window').width - (SCREEN_PADDING * 2) - (CARD_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

/**
 * A React component that displays a product card with a product name, price, and inStock status.
 * When the card is pressed, it navigates to the ProductDetails screen with the product details as route params.
 */

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const { productName, price, inStock } = product;

  /**
   * Handles press on a product card by navigating to the ProductDetails screen
   * and passing the product details as route params.
   */
  const handlePress = () => {
    navigation.navigate("ProductDetails", { productName: productName, price: price, inStock: inStock });
  };

  return (
    <TouchableOpacity 
      onPress={handlePress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderText}>Product Image</Text>
        </View>

        {/* Status Badge */}
        <View style={[
          styles.statusBadge, 
          { backgroundColor: inStock === "True" ? '#e7f3ef' : '#ffebee' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: inStock === "True" ? '#2e7d32' : '#c62828' }
          ]}>
            {inStock === "True" ? "In Stock" : "Out of Stock"}
          </Text>
        </View>

        {/* Product Info */}
        <View style={styles.contentContainer}>
          <Text style={styles.productName} numberOfLines={2}>
            {productName}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <Text style={styles.price}>{price.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    margin: CARD_MARGIN,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',

  },
  imagePlaceholder: {
    width: '100%',
    height: cardWidth, // Square aspect ratio
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#757575',
    fontSize: 14,
  },
  statusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeeSymbol: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginRight: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

export default ProductCard;