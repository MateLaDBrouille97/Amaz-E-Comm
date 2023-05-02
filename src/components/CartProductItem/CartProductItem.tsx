import { DataStore } from 'aws-amplify';
import React, { useState } from 'react';
import { Image, View, Text, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CartProduct } from '../../models';
import Button from '../Button';
import QuantitySelector from '../QuantitySelector';
import styles from './styles';



interface CartProductItemProps {
    // cartItem: {
    //     id: string;
    //     quantity: number;
    //     option?: string;
    //     item: {
    //         id: string;
    //         title: string;
    //         image: string;
    //         avgRating: number;
    //         ratings: number;
    //         price: number;
    //         oldPrice?: number;
    //     };
    // }

    cartItem: CartProduct;
}

const CartProductItem = ({ cartItem }: CartProductItemProps) => {
    //   console.log(cartItem);
    const {product, ...cartProduct } = cartItem;
    const [itemToDelete, setItemToDelete] = useState<CartProduct>();
    // const { quantity:QuantityProp, item } = cartItem;
    // const [quantity,setQuantity]=useState(QuantityProp);

    const updateQuantity = async (newQuantity: number) => {
        const original = await DataStore.query(CartProduct, cartProduct.id);

        await DataStore.save(
            CartProduct.copyOf(original, updated => {
                updated.quantity = newQuantity;
            }),
        );
    };
    //Permet d'updater la quantite


    //------------------------------------------------------------------------>Delete<----------------------------------------------
    const deleteMessage = async () => {
        const cartItems = await DataStore.query(CartProduct, cartItem?.id);
        await DataStore.delete(cartItems);
    };

    const confirmDelete = () => {
        Alert.alert(
            "Confirm delete",
            "Are you sure you want to delete the message?",
            [
                {
                    text: "Delete",
                    onPress: deleteMessage,
                    style: "destructive",
                },
                {
                    text: "Cancel",
                },
            ]
        );
    };
    
    return (
        <View style={styles.root}>
            <View style={styles.row}>
                <Image style={styles.image} source={{ uri: product?.image }} />
                <View style={styles.rightContainer}>
                    <Text style={styles.title} numberOfLines={3}>
                        {product?.title}
                    </Text>
                    {/* Ratings */}
                    <View style={styles.ratingsContainer}>
                        {[0, 0, 0, 0, 0].map((el, i) => (
                            <FontAwesome
                                key={`${product?.id}-${i}`}
                                style={styles.star}
                                name={i < Math.floor(product?.avgRating) ? 'star' : 'star-o'}
                                size={18}
                                color={'#e47911'}
                            />
                        ))}
                        <Text>{product?.ratings}</Text>
                    </View>
                    <Text style={styles.price}>
                        from ${product?.price}
                        {product?.oldPrice && (
                            <Text style={styles.oldPrice}> ${product?.oldPrice}</Text>
                        )}
                    </Text>

                </View>
            </View>
            <View style={styles.quantityContainer}>
                <QuantitySelector
                    quantity={cartProduct.quantity}
                    setQuantity={updateQuantity}
                />
                <View style={{ marginLeft: 10, marginRight: 10 }}>
                    <Button text="Delete Item" onPress={confirmDelete} />
                </View>
            </View>
        </View>
    );
};

export default CartProductItem;

