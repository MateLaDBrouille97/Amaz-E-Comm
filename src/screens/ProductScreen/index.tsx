import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import product from '../../data/product';
import { Picker } from '@react-native-picker/picker';
import Button from '../../components/Button';
import QuantitySelector from '../../components/QuantitySelector';
import ImageCarousel from '../../components/ImageCarousel';
import { DataStore, Auth } from 'aws-amplify';
import { Product, CartProduct } from '../../models';
import { useNavigation, useRoute } from '@react-navigation/native';

const ProductScreen = () => {
  // const [selectedOption,setSelectedOption]=useState(product.options?product.options[0]:null);
  const [product, setProduct] = useState<Product | undefined>(undefined);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

 
  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);
  //On fait une requete a la base de donnees pour les elements de type produit mais surtout on demande a la base de donnees de rapporter specifiquement un element en fonction de id 
  //Donc au final on est redirige vers la fiche de notre element produit en fonction de son id 

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]);
    }
  }, [product]);
  //

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
      
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('shoppingCart');
  };
//Ici on cree une fonction qui permet de d'ajouter une element produit a un charriot
//On va chercher dans la base de donnees l'utilisateur actuel 
//On cree un nouveau charriot qui possede l'id de l'utilisateur,id du produit les option selectionne pour l'objet et la quantite d'objet que l'on veut  
//Ensemble sauvegarder dans la base de donnees et on est rediriger vers la page shoppingCart

  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product?.title}</Text>

      {/* Image carousel */}
      <ImageCarousel images={product?.images} />

      {/* Option selector */}
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}
      >
        {product?.options?.map(option => (
          <Picker.Item label={option} value={option} />
        ))}
      </Picker>

      {/* Price */}
      <Text style={styles.price}>
        from ${product?.price.toFixed(2)}
        {product?.oldPrice && (
          <Text style={styles.oldPrice}> ${product?.oldPrice.toFixed(2)}</Text>
        )}
      </Text>

      {/* Description */}
      <Text style={styles.description}>{product?.description}</Text>

      {/* Quantity selector */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <Button
        text={'Add To Cart'}
        onPress={onAddToCart}
        containerStyles={{ backgroundColor: '#e3c905' }}
      />
      <Button
        text={'Buy Now'}
        onPress={() => {
          console.warn('Buy now');
        }}
      />
    </ScrollView>
  );

}

export default ProductScreen;

