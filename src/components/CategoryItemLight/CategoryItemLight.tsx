import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CategoryItemLight = ({item}) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Category', { category: item?.id });

    }

    return (
        <Pressable onPress={onPress}>
            <View style={styles.rightContainer}>
                <Image 
                source={{uri:item?.image}}
                style={styles.image}/>
            </View>
        </Pressable>
    )

}

export default CategoryItemLight

const styles = StyleSheet.create({
    root: {

        borderColor: '#d1d1d1',
        borderRadius: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 5,

        height: 220,
        width: 200,
    },

    rightContainer: {
        alignItems: 'center',
        marginTop: 0,
        margin: 3,
        marginBottom: 10,
        marginRight:10,
    },
    title: {
        marginTop: 5,
        fontSize: 21,
        bottom: 0,

    },
    price: {
        marginTop: 30,
        fontSize: 18,
        fontWeight: 'bold',
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through',
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    star: {
        margin: 2,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius:30,
        marginBottom: 6,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
    },
})