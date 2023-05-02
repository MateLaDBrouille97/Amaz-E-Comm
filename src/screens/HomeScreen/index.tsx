import { StyleSheet, View, FlatList, TextInput, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductItem from '../../components/ProductItem/ProductItem';
// import products from '../../data/products';
import { DataStore } from 'aws-amplify';
import { Product } from '../../models';
import Feather from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import CategoryItemLight from '../../components/CategoryItemLight';
import { Category } from '../../models';
import CategoryItem from '../../components/CategoryItem';


const HomeScreen = ({ searchValue }: { searchValue: string }) => {

  const [products, setProducts] = useState<Product[]>([]);
  const [pFiltered, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [search, setSearch] = useState('');



  const searchFilter = (text) => {
    if (text) {
      const newData = products.filter((item) => {
        const itemData = item.title ? item.title.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredProducts(newData);
      setSearch(text);

    } else {
      setFilteredProducts(products);
      setSearch(text);
    }
  }



  useEffect(() => {
    DataStore.query(Product).then(setProducts);
  }, []);
  // Ici on fait une requete a la basse de donnees et on lui demande de rechercher les produits que l'on place ensuite dans un element getter (setProducts)
  // Ainsi on peut appeler les produits et les visualiser 

  useEffect(() => {
    DataStore.query(Category).then(setCategory);
  }, []);

  return (

    <ScrollView >
      <View style={{ backgroundColor: '#4487c7' }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 10
        }}>
          <View
            style={{
              padding: 5,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 20,
              marginRight: 40,
              marginBottom: 10,
              marginLeft: 40,
              marginTop: 10,
              flex: 1,
            }}>
            <Feather name="search" size={20} />
            <TextInput
              style={{ height: 40, marginLeft: 10, marginRight: 50 }}
              placeholder="Search..."
              value={search}
              onChangeText={(text) => searchFilter(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.page}>
        <View>
          <FlatList
            data={category}
            renderItem={({ item }) => <CategoryItemLight item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <FlatList
          data={pFiltered}
          renderItem={({ item }) => <ProductItem item={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}

        />
      </View>

    </ScrollView>


  )
}

export default HomeScreen

const styles = StyleSheet.create({
  page: {
    padding: 10
  }
})

//Une FlatList permet de montrer une liste elements
//Cette element qui est present dans rect native comprends 2 elements
// 1- Data
// 2- renderItem == > Comment chaque donnee doit etre represente dans la FlatList ==> ici c'est une fonction lambda avec {item} qui doit etre rendu et le composant que l'on a definit qui est ProductItem.