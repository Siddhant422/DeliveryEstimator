import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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

const ImageHeading = ({productName}) => {
  return (
    <View>
      {renderHeader()}
      <Text style={styles.productTitle}>{productName}</Text>
      {renderBenefits()}

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382816.jpg',
          }}
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.zoomButton}>
          <Icon name="maximize-2" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {renderFeatures()}
    </View>
  );
};

export default ImageHeading;

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
        borderRadius: 22,
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
     
});
