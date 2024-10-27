import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductDetailsScreen = () => {
  const route = useRoute();
  const { productName, price } = route.params;
  console.log(productName, price);
  const [quantity, setQuantity] = useState(1);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity>
        <Icon name="menu" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="search" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.cartBadge}>
          <Text style={styles.badgeText}>2</Text>
        </View>
        <Icon name="shopping-bag" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const renderBenefits = () => (
    <View style={styles.benefitsContainer}>
      <View style={styles.benefitItem}>
        <Icon name="check-circle" size={16} color="#4CAF50" />
        <Text style={styles.benefitText}>Lightens Spots</Text>
      </View>
      <View style={styles.benefitItem}>
        <Icon name="check-circle" size={16} color="#4CAF50" />
        <Text style={styles.benefitText}>Targets Pigmentation</Text>
      </View>
    </View>
  );

  const renderFeatures = () => (
    <View style={styles.featuresContainer}>
      <View style={styles.featureItem}>
        <MaterialIcons name="verified" size={20} color="#6B7280" />
        <Text style={styles.featureText}>101% Original</Text>
      </View>
      <View style={styles.featureItem}>
        <Icon name="tag" size={20} color="#6B7280" />
        <Text style={styles.featureText}>Lowest Price</Text>
      </View>
      <View style={styles.featureItem}>
        <Icon name="truck" size={20} color="#6B7280" />
        <Text style={styles.featureText}>Free Shipping</Text>
      </View>
    </View>
  );

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
        {renderHeader()}
        <Text style={styles.productTitle}>{productName}</Text>
        {renderBenefits()}

        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382816.jpg'
            }}
            style={styles.productImage}
          />
          <TouchableOpacity style={styles.zoomButton}>
            <Icon name="maximize-2" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {renderFeatures()}

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

        {renderOffers()}

        <View style={styles.deliveryInfo}>
          <Icon name="truck" size={20} color="#000" />
          <Text style={styles.deliveryText}>Get it By Oct. 24</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color="#FFA41C" />
            <Text style={styles.ratingText}>4.75 (139 Reviews)</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Icon name="shopping-cart" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add to cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton}>
            <Icon name="zap" size={20} color="#fff" />
            <Text style={styles.buttonText}>Buy it now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  breadcrumb: {
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  breadcrumbText: {
    color: '#6B7280',
    fontSize: 14,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  benefitsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  benefitText: {
    color: '#374151',
    fontSize: 14,
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 16,
 
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  zoomButton: {
    position: 'absolute',
    right: 24,
    top: 24,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  featureItem: {
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#6B7280',
  },
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
  },
  deliveryText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
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
    backgroundColor: '#8B5CF6',
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
});

export default ProductDetailsScreen;