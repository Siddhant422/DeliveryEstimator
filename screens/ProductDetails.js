import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getPincodeMap} from '../assets/Pincode';
import PriceQty from '../components/PriceQty';
import ImageHeading from '../components/ImageHeading';


/**
 * Screen component for product details page.
 */
const ProductDetailsScreen = () => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const route = useRoute();
  const { productName, price, inStock } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [enteredPincode, setEnteredPincode] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [countdown, setCountdown] = useState("");
  const [showCountdown, setShowCountdown] = useState(false);

/**
 * Validates the entered pincode and updates the state with validation messages and delivery date.
 *
 * This function checks if the entered pincode is valid by comparing it with a predefined pincode map.
 * If the pincode is valid, it sets the validation message and calculates the delivery date based on the
 * logistics provider. The delivery date calculation varies based on the time of the day and the provider.
 * It also determines whether to show a countdown timer for the delivery time.
 *
 * Updates:
 * - `isValid`: Boolean indicating whether the pincode is valid.
 * - `validationMessage`: Message indicating the result of the validation.
 * - `deliveryDate`: Estimated delivery date based on the provider and current time.
 * - `showCountdown`: Boolean indicating whether to display a countdown timer.
 */
  const validatePincode = () => {
    if(enteredPincode.length < 6) {
      setIsValid(false);
      setValidationMessage("Please Enter a valid Pincode!");
      return;
    }
    const pincodeMap = getPincodeMap();
    const pincodeData = pincodeMap.get(parseInt(enteredPincode));
    
    if(!pincodeData) {
      setIsValid(false);
      setValidationMessage("Pincode not found!");
      return;
    }
    
    setIsValid(true);
    setValidationMessage("Valid Pincode!");

    if(pincodeData.logisticsProvider == "Provider A") {
      const todayDate = new Date();
      if(todayDate.getHours() >= 17) {
        todayDate.setDate(todayDate.getDate() + 1);
        setShowCountdown(false);
      }
      else {
        setShowCountdown(true);
        todayDate.setHours(22);
        todayDate.setMinutes(0);
        todayDate.setSeconds(0);
      }
      setDeliveryDate(todayDate);
    }
    else if(pincodeData.logisticsProvider == "Provider B") {
      const todayDate = new Date();
      if(todayDate.getHours() >= 9) {
        todayDate.setDate(todayDate.getDate() + 1);
        setShowCountdown(false);
      }
      else {
        setShowCountdown(true);
        todayDate.setHours(9);
        todayDate.setMinutes(0);
        todayDate.setSeconds(0);
      }
      setDeliveryDate(todayDate);
    }
    else {
      const todayDate = new Date();
      todayDate.setDate(todayDate.getDate() + pincodeData.tat);
      setDeliveryDate(todayDate);
      setShowCountdown(false);
    }
  }

  useEffect(() => {
    if(!showCountdown) return;
    if(!deliveryDate) return;

    const intervalId = setInterval(() => {
      const now = new Date();
      
      const timeRemaining = deliveryDate - now;

      if (timeRemaining <= 0) {
        clearInterval(intervalId);
        setShowCountdown(false);
        setCountdown("");
      } else {
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [deliveryDate]);

/**
 * Renders a section displaying available offers for the product.
 * The section includes an offer title and a list of offers.
 * Each offer is displayed with an icon, offer description, and count.
 */
  const renderOffers = () => (
    <View style={styles.offerSection}>
      <Text style={styles.offerTitle}>Available offers</Text>
      <View style={styles.offerItem}>
        <MaterialIcons name="local-offer" size={20} color="#92400E" />
        <Text style={styles.offerText}>Get free shipping</Text>
        <Text style={styles.offerCount}>3/4</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageHeading productName = {productName}/>
        <PriceQty price={price} quantity={quantity} inStock={inStock}/>

        {renderOffers()}

        {
          inStock == "True" && (
            <View style={{padding: 16}}>
              <View style={styles.pincodeCheckHeader}>
                <MaterialIcons name="location-on" size={24} color="#000" />
                <Text style={styles.pincodeCheckHeaderText}>Check for Delivery Details</Text>
              </View>
              <View style={styles.pincodeCheckInputContainer}>
                <TextInput
                  style={styles.pincodeCheckInput}
                  placeholder="Enter Pincode"
                  keyboardType="number-pad"
                  value={enteredPincode}
                  onChangeText={setEnteredPincode}
                  maxLength={6}
                />
                <TouchableOpacity style={styles.pincodeCheckButton} onPress={()=>{validatePincode()}}>
                  <Text style={styles.pincodeCheckButtonText}>CHECK</Text>
                </TouchableOpacity>
              </View>
    
              {validationMessage !== '' && (
                <Text style={{marginTop: 8, marginLeft: 4, fontSize: 14, fontWeight: '500', color: isValid ? 'green' : 'red'}}>
                  {validationMessage}
                </Text>
              )}
    
            </View>
          )
        }

        {
          showCountdown && (
            <Text style={styles.countdown}>Order within: {countdown}</Text>
          )
        }

        <View style={styles.deliveryInfo}>
          {
            inStock == "True"
            ?
            <>
              <Icon name="truck" size={20} color="#000" />
              <Text style={styles.deliveryText}>{isValid ? `Get it By ${months[deliveryDate.getMonth()]}. ${deliveryDate.getDate()}` : "Check Pincode"}</Text>
            </>
            :
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>
              {"Out of Stock"}
            </Text>
          }
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFA41C" />
            <Text style={styles.ratingText}>4.75 (139 Reviews)</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.addToCartButton, {backgroundColor: inStock=="True"?"#7C3AED":"#a4a4a4"}]} disabled={inStock == "True" ? false : true}>
            <Icon name="shopping-cart" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buyNowButton, {backgroundColor: inStock=="True" ? "#7C3AED" : "#a4a4a4"}]} disabled={inStock == "True" ? false : true}>
            <Icon name="zap" size={20} color="#fff" />
            <Text style={styles.buttonText}>Buy it now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  recentlyAddedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  recentlyAddedText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  offerSection: {
    padding: 16,
    backgroundColor: '#FEF3C7',
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#92400E',
    marginBottom: 8,
  },
  offerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  offerText: {
    flex: 1,
    color: '#92400E',
  },
  offerCount: {
    color: '#92400E',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    justifyContent: 'space-between'
  },
  deliveryText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#4B5563',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#a4a4a4',
    padding: 16,
    borderRadius: 8,
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  pincodeCheckHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pincodeCheckHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: 'black'
  },
  pincodeCheckInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pincodeCheckInput: {
    flex: 1,
    padding: 10,
    paddingLeft: 18,
    fontSize: 16,
  },
  pincodeCheckButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pincodeCheckButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  countdown: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 16,
  },
});

export default ProductDetailsScreen;