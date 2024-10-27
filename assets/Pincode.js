import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

const ProductDetailsScreen = () => {
  const [pinCode, setPinCode] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [timeRemaining, setTimeRemaining] = useState('');
  const [provider, setProvider] = useState('Provider B'); // Should be fetched based on product/region

  // Function to format time remaining
  const formatTimeRemaining = (milliseconds) => {
    if (milliseconds <= 0) return null;
    
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  // Calculate time remaining for same-day delivery
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const cutoffTime = new Date();
      
      if (provider === 'Provider A') {
        cutoffTime.setHours(17, 0, 0, 0); // 5 PM cutoff
      } else if (provider === 'Provider B') {
        cutoffTime.setHours(9, 0, 0, 0); // 9 AM cutoff
      }

      // If current time is past cutoff, set cutoff to next day
      if (now > cutoffTime) {
        cutoffTime.setDate(cutoffTime.getDate() + 1);
      }

      const remaining = cutoffTime - now;
      if (remaining > 0) {
        setTimeRemaining(formatTimeRemaining(remaining));
      } else {
        setTimeRemaining(null);
      }
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [provider]);

  // Function to calculate estimated delivery time
  const calculateEstimatedDelivery = () => {
    const currentTime = new Date();
    const inStock = true; // This should be fetched from your inventory system
    let deliveryMessage = '';
    
    if (!pinCode || pinCode.length !== 6) {
      setEstimatedDelivery('Please enter a valid 6-digit pin code');
      return;
    }

    switch (provider) {
      case 'Provider A':
        if (inStock && currentTime.getHours() < 17) {
          deliveryMessage = 'Delivery today';
        } else {
          deliveryMessage = `Delivery tomorrow by ${currentTime.getHours() >= 17 ? '9' : '7'} PM`;
        }
        break;
        
      case 'Provider B':
        if (inStock && currentTime.getHours() < 9) {
          deliveryMessage = 'Delivery today';
        } else {
          deliveryMessage = 'Delivery tomorrow by 9 PM';
        }
        break;
        
      default:
        // For General Partners
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 5);
        deliveryMessage = `Delivery by ${deliveryDate.toLocaleDateString('en-IN')}`;
    }

    setEstimatedDelivery(deliveryMessage);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.productTitle}>Sesderma Azelac RU Liposomal Serum</Text>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382816.jpg',
          }}
          style={styles.productImage}
        />
      </View>

      {/* Price and Availability */}
      <View style={styles.priceSection}>
        <Text style={styles.price}>₹ 2,650</Text>
        <Text style={styles.taxText}>(incl. of all taxes)</Text>
      </View>

      {/* Delivery Timer */}
      {timeRemaining && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>
            Order within <Text style={styles.timerHighlight}>{timeRemaining}</Text> for same-day delivery
          </Text>
        </View>
      )}

      {/* Pin Code Input */}
      <View style={styles.pinCodeContainer}>
        <Text style={styles.optionTitle}>Enter Pin Code:</Text>
        <TextInput
          style={styles.pinCodeInput}
          placeholder="Pin Code"
          value={pinCode}
          onChangeText={setPinCode}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity
          style={styles.validateButton}
          onPress={calculateEstimatedDelivery}>
          <Text style={styles.validateButtonText}>Check Delivery Time</Text>
        </TouchableOpacity>
      </View>

      {/* Estimated Delivery Time */}
      {estimatedDelivery && (
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryText}>{estimatedDelivery}</Text>
          <Text style={styles.providerText}>Fulfilled by {provider}</Text>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <Text style={styles.buyNowText}>Buy it now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  priceSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  taxText: {
    fontSize: 12,
    color: '#6B7280',
  },
  timerContainer: {
    backgroundColor: '#FEF3C7',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  timerText: {
    textAlign: 'center',
    color: '#92400E',
    fontSize: 14,
  },
  timerHighlight: {
    fontWeight: 'bold',
  },
  pinCodeContainer: {
    marginVertical: 20,
  },
  pinCodeInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  validateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  validateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  deliveryContainer: {
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
  },
  providerText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 10,
  },
  buyNowText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;