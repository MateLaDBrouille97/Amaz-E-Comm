import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';


const CategoryItem = ({ item }) => {

    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Category', { category: item?.id });

    }

    return (
        <Pressable onPress={onPress}>
            <View style={styles.rightContainer}>
                <ImageBackground
                    source={{ uri: item?.image }}
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
                            position: 'absolute',
                            bottom: 0,
                            left: 10,
                            fontSize: 23,
                            textAlign: "center",

                        }}
                    >
                        {item?.name}
                    </Text>
                </ImageBackground>
            </View>
        </Pressable>


    )
}

export default CategoryItem

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
        marginTop: 20,
        margin: 1.5,
        marginBottom: 10
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
        width: 160,
        height: 180,
        resizeMode: 'contain',

        marginBottom: 6,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
    },
})