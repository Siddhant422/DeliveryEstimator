import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const PriceQty = ({price, quantity, inStock}) => {
  return (
    <View>
      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>MRP:</Text>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.taxText}>(incl. of all taxes)</Text>
      </View>

      <View style={styles.stockInfo}>
        <Icon name="alert-circle" size={16} color="#EF4444" />
        <Text style={styles.stockText}>Hurry, Few Left!</Text>
      </View>

      <View style={styles.sizeSection}>
        <Text style={styles.sizeLabel}>Size:</Text>
        <TouchableOpacity style={styles.sizeButton}>
          <Text style={styles.sizeButtonText}>30 ml</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quantitySection}>
        <Text style={styles.quantityLabel}>Qty:</Text>
        <TouchableOpacity style={styles.quantitySelector}>
          <Text style={styles.quantitySelectorText}>{quantity}</Text>
          <Icon name="chevron-down" size={20} color="#000" />
        </TouchableOpacity>
        <View style={styles.recentlyAddedBadge}>
          <Icon name="trending-up" size={16} color="#4CAF50" />
          <Text style={styles.recentlyAddedText}>Recently in 951 carts</Text>
        </View>
      </View>
    </View>
  );
};

export default PriceQty;

const styles = StyleSheet.create({
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#374151',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  taxText: {
    fontSize: 12,
    color: '#6B7280',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginTop: -8,
  },
  stockText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '500',
  },
  sizeSection: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sizeLabel: {
    fontSize: 16,
    color: '#374151',
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3E8FF',
  },
  sizeButtonText: {
    color: '#8B5CF6',
    fontWeight: '500',
  },
  quantitySection: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityLabel: {
    fontSize: 16,
    color: '#374151',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  quantitySelectorText: {
    fontSize: 16,
    color: '#374151',
  },
});
