import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import products from '../assets/Product.js';
import pincodeData from '../assets/Pincode.js';
import stocks from '../assets/stock.js';

const { width } = Dimensions.get('window');
const SPACING = 8;
const NUM_COLUMNS = 2;
const ITEM_WIDTH = (width - (SPACING * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const simulateStock = products => {
  var inStocks = [];
  products.forEach(product => {
    if (product.productId <= stocks.length - 1)
      inStocks.push(stocks[product.productId]);
  });
  return products.map((product, index) => ({
    ...product,
    inStock: stocks[Number(product.productId) - 1]?.stockAvailable,
  }));
};

const ProductDisplay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayProducts, setDisplayProducts] = useState([]);
  const productsPerPage = 6;
  const totalProducts = simulateStock(products);
  const flatListRef = useRef(null);

  const translateY = useRef(new Animated.Value(50)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  // Function to normalize data for grid layout
  const normalizeData = (data) => {
    const normalizedData = [...data];
    const remainder = data.length % NUM_COLUMNS;
    
    if (remainder !== 0) {
      // Add empty items to complete the last row
      for (let i = 0; i < NUM_COLUMNS - remainder; i++) {
        normalizedData.push({ productId: `empty-${i}`, isEmpty: true });
      }
    }
    return normalizedData;
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const pageProducts = totalProducts.slice(startIndex, endIndex);
    setDisplayProducts(normalizeData(pageProducts));
    
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }

    // Trigger animation when products change
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentPage, translateY, opacity]);

  const nextPage = () => {
    if (currentPage < Math.ceil(totalProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Featured Products</Text>
        <Text style={styles.headerSubtitle}>
          Discover our exclusive collection
        </Text>
      </View>
    </View>
  );

  const renderProductItem = ({ item }) => {
    if (item.isEmpty) {
      return <View style={[styles.productContainer, styles.emptyItem]} />;
    }

    return (
      <Animated.View
        style={[
          styles.productContainer,
          {
            transform: [{ translateY }],
            opacity,
          },
        ]}>
        <ProductCard product={item} pincodeData={pincodeData} />
      </Animated.View>
    );
  };

  const PaginationArrow = ({ direction, disabled, onPress }) => (
    <TouchableOpacity
      style={[styles.pageButton, disabled && styles.pageButtonDisabled]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={[styles.arrowText, disabled && styles.arrowTextDisabled]}>
        {direction === 'left' ? '←' : '→'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderHeader()}
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          key={`grid-${NUM_COLUMNS}`}
          data={displayProducts}
          keyExtractor={item => item.productId.toString()}
          renderItem={renderProductItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={styles.row}
          scrollEventThrottle={16}
        />
        <View style={styles.pagination}>
          <PaginationArrow
            direction="left"
            disabled={currentPage === 1}
            onPress={prevPage}
          />
          <View style={styles.pageIndicator}>
            <Text style={styles.pageNumber}>
              {currentPage} / {Math.ceil(totalProducts.length / productsPerPage)}
            </Text>
          </View>
          <PaginationArrow
            direction="right"
            disabled={
              currentPage === Math.ceil(totalProducts.length / productsPerPage)
            }
            onPress={nextPage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  header: {
    width: '100%',
    backgroundColor: '#4A00E0',
    zIndex: 1,
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#4A00E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
  },
  listContainer: {
    padding: SPACING,
  },
  row: {
    justifyContent: 'space-between',
    marginHorizontal: SPACING,
  },
  productContainer: {
    width: ITEM_WIDTH,
    marginBottom: SPACING * 2,
  },
  emptyItem: {
    backgroundColor: 'transparent',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F6F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pageButtonDisabled: {
    backgroundColor: '#F0F0F0',
  },
  arrowText: {
    fontSize: 20,
    color: '#4A00E0',
  },
  arrowTextDisabled: {
    color: '#BDBDBD',
  },
  pageIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F6F8',
    borderRadius: 20,
  },
  pageNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A00E0',
  },
});

export default ProductDisplay;