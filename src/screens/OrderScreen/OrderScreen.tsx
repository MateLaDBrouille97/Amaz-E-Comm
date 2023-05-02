import { StyleSheet, Text, View, FlatList, useWindowDimensions, SafeAreaView, Image, ImageBackground } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Category, OrderProduct, Product } from '../../models';
import { Auth, DataStore } from 'aws-amplify';
import { Order } from '../../models';
import WidgetItem from '../../components/WidgetItem/WidgetItem';
import { Widget } from '../../models';
import CategoryItem from '../../components/CategoryItem';
import { ScrollView } from 'react-native-gesture-handler';


const OrderScreen = () => {
    const [widget, setWidget] = useState<Widget[]>();
    const [category, setCategory] = useState<Category[]>();
    const [pFiltered, setFilteredProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');

    const windowWidth = useWindowDimensions().width;


    useEffect(() => {
        DataStore.query(Widget).then(setWidget);
    }, []);


    useEffect(() => {
        DataStore.query(Category).then(setCategory);
        
    }, []);


    return (
        <ScrollView>
            <SafeAreaView style={{ backgroundColor: '#4487c7' }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginRight: 10
                }}>
                    <View
                        style={{

                            alignItems: 'center',
                            borderRadius: 20,
                            marginRight: 40,
                            marginBottom: 10,
                            marginLeft: 40,
                            marginTop: 10,
                            flex: 1,
                        }}>

                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.page}>

                <ImageBackground
                    source={{ uri: "https://cdn.pocket-lint.com/r/s/970x/assets/images/158444-phones-review-apple-iphone-13-review-images-image1-clh15n2ocg.jpg" }}
                    style={[styles.image, {
                        borderRadius: 30,
                        position: 'relative',
                        top: 7,
                        left: 5,
                    }]}
                    imageStyle={{ borderRadius: 20 }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            color: 'white',
                            position: 'absolute', // child
                            bottom: 0, // position where you want
                            left: 10,
                            fontSize: 23,
                            textAlign: "center",

                        }}
                    >
                        Soul Dreams
                    </Text>
                </ImageBackground>

                <FlatList
                    data={widget}
                    renderItem={({ item }) => <WidgetItem item={item} />}  
                    keyExtractor={(item, index) => index.toString()}
                />

                <View style={{backgroundColor:'#4487c7'}}>
                    <FlatList
                    data={category}
                    renderItem={({ item }) => <CategoryItem item={item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
                </View>
                
            </View>



        </ScrollView>

    )
}

export default OrderScreen

const styles = StyleSheet.create({
    page: {
       
    },
    image: {
        marginLeft: 10,
        marginRight: 20,
        marginTop: 20,
        marginBottom: 20,
        height: 220,
        resizeMode: 'contain',
        borderRadius: 30,
    }
})