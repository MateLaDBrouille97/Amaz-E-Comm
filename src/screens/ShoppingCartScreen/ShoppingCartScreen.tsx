import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState,useEffect } from 'react';
// import cartProducts from '../../data/cart';
import Button from '../../components/Button';
import CartProductItem from '../../components/CartProductItem';
import {useNavigation} from '@react-navigation/native';
import {withAuthenticator} from 'aws-amplify-react-native';
import {DataStore, Auth} from 'aws-amplify';
import { CartProduct, Product } from '../../models';

const ShoppingCartScreen = () => {
    
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const navigation = useNavigation();

  const fetchCartProducts = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    // TODO query only my cart items
    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(setCartProducts);
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);
//Ici on va chercher les elements commandes specifique a l'utilisateur actuel
//Pour ce faire on va chercher l'utilisateur dans la base de donnees
//On fait une requete dans la base donnees avec comme requete les cartProducts en utilisaant un predicat  qui va utiliser la variable userSub (id de l'utilsateur)de cartProduct et en comparant cette valeur a celle de l'utilisateur actuel>
//Si les deux matchs on  a une liste d'elemnt qui correspond a la commande de l'utilisateur.


//---------------------------------------------------------------------------------------------------------------------------------
useEffect(() => {
  const subscription = DataStore.observe(CartProduct).subscribe(msg =>
    fetchCartProducts(),
  );
  return subscription.unsubscribe;
}, []);
//S'il y a un update on veut appeler fetchCartProducts 


useEffect(() => {
  const subscriptions = cartProducts.map(cp =>
    DataStore.observe(CartProduct, cp.id).subscribe(msg => {
      if (msg.opType === 'UPDATE') {
        setCartProducts(curCartProducts =>
          curCartProducts.map(cp => {
            if (cp.id !== msg.element.id) {
              console.log('differnt id');
              return cp;
            }
            return {
              ...cp,
              ...msg.element,
            };
          }),
        );
      }
    }),
  );

  return () => {
    subscriptions.forEach(sub => sub.unsubscribe());
  };
}, [cartProducts]);
//------------------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (cartProducts.filter(cp => !cp.product).length === 0) {
      return;
    }

    const fetchProducts = async () => {
      // query all products that are used in cart
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
          DataStore.query(Product, cartProduct.productID),
        ),
      );

      // assign the products to the cart items
      setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p?.id === cartProduct.productID),
        })),
      );//Ici le Setter va declencher le useEffect ()
      //Ici pour chaque element de charriot on va creer un tableau avec les objets du charriot auquel on associe le nouveau produit 
      //Pour avoir le nouveau produit il faut utiliser .find et on va chercher le produit en fonction de son ID
    };

    fetchProducts();
  }, [cartProducts]);


    const totalPrice = cartProducts.reduce(
        (summedPrice, product) =>
          summedPrice + (product?.product?.price || 0) * product.quantity,
        0,
      );
    //Calcul du prix total


  const onCheckout = () => {
    navigation.navigate('Address', {totalPrice});
  };

  if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
  }


  return (
    <View style={{padding: 10}}>
    {/* Render Product Componet */}
    <FlatList
      data={cartProducts}
      renderItem={({item}) => <CartProductItem cartItem={item} />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View>
          <Text style={{fontSize: 18}}>
            Subtotal ({cartProducts.length} items):{' '}
            <Text style={{color: '#e47911', fontWeight: 'bold'}}>
              ${totalPrice.toFixed(2)}
            </Text>
          </Text>
          <Button
            text="Proceed to checkout"
            onPress={onCheckout}
            containerStyles={{
              backgroundColor: '#f7e300',
              borderColor: '#c7b702',
            }}
          />
        </View>
      )}
    />
  </View>
  )
}



const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Full name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string',
    },
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      displayOrder: 3,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 4,
      type: 'password',
    },

  ]
}
export default withAuthenticator(ShoppingCartScreen,{ signUpConfig });

const styles = StyleSheet.create({})