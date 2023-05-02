import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Product } from '../../models';
import ProductItem from '../../components/ProductItem/ProductItem';
import Feather from 'react-native-vector-icons/Feather';

const CategoryScreen = () => {

    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [products, setProducts] = useState<(Product | undefined)[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [sortedP, setSorted] = useState<Product[] | undefined>(undefined);
    const [pFiltered, setFilteredProducts] = useState<Product[] | undefined>([]);
    const [search, setSearch] = useState('');
    const [quantity, setQuantity] = useState(1);
    const navigation = useNavigation();
    const route = useRoute();


    useEffect(() => {
        const fetchProducts = async () => {
            const sorted = (await DataStore.query(Product))
                .filter(product => product.category === route.params?.category)
            setSorted(sorted);
            setFilteredProducts(sorted);
        }
        fetchProducts();
    }, [])

    
    // const sorting = async () => {
    //     if (!route.params?.category) {
    //         return;
    //     }
    //     const products= DataStore.query(Product)
    //     const prodSorted =  Promise.all((await products).map 
    //         (product=>DataStore.query(
    //             Product,route.params?.category)));
    //     setProducts(await prodSorted);
    //     console.log(prodSorted);
    // }


    // useEffect(() => {
    //     sorting()
    // }, [route.params?.category]);




    const searchFilter = (text) => {
        if (text) {
            const newData = sortedP?.filter((item) => {
                const itemData = item?.title ? item?.title.toLowerCase() : ''.toLowerCase();
                const textData = text.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            setSorted(newData);
            setSearch(text);

        } else {
            setSorted(pFiltered);
            setSearch(text);
        }
    }

    return (

        <View >
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
                <FlatList
                data={sortedP}
                renderItem={({ item }) => <ProductItem item={item} />}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}

            />
            </View>
            
        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    page: {
        padding: 10
    }
})