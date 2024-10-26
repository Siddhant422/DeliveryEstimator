import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import ProductCard from '../components/ProductCard';
import products from '../assets/Product.js';
import pincodeData from '../assets/Pincode.js';
import stocks from '../assets/stock.js';

// Simulate stock availability for 80% of products
const simulateStock = products => {
    var inStocks = []
    products.forEach(product => {
        if(product.productId <= stocks.length - 1)
        inStocks.push(stocks[product.productId]);
    });
    console.log(inStocks[1]);
  const inStockCount = stocks.find(stock => {
    return stock.productId == products.productId?stock.stockAvailable:"False";
  });
  return products.map((product, index) => ({
    ...product,
    inStock: stocks[product.productId].stockAvailable,
  }));
};

const ProductDisplay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayProducts, setDisplayProducts] = useState([]);
  const productsPerPage = 4; // Set number of products per page
  const totalProducts = simulateStock(products);

  // Update displayed products based on current page
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayProducts(totalProducts.slice(startIndex, endIndex));
  }, [currentPage]);

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList
        data={displayProducts}
        keyExtractor={item => item.productId.toString()}
        renderItem={({item}) => (
          <ProductCard product={item} pincodeData={pincodeData} />
        )}
      />
      <View style={styles.pagination}>
        <Button
          title="Previous"
          onPress={prevPage}
          disabled={currentPage === 1}
        />
        <Text style={styles.pageNumber}>Page {currentPage}</Text>
        <Button
          title="Next"
          onPress={nextPage}
          disabled={
            currentPage === Math.ceil(totalProducts.length / productsPerPage)
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDisplay;
