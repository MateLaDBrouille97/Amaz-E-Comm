import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import { SafeAreaView, View, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { DataStore } from 'aws-amplify';
import { Product } from '../models';


const Stack = createStackNavigator();

interface HeaderComponentProps {
  searchValue: string;
  setSearchValue: () => void;
}
//C'est une interface ou on definit les elements de recherche 

const HeaderComponent = ({
  searchValue,
  setSearchValue
}:HeaderComponentProps) => {

  // const onChangeText = async (text)=>{
  //   (await DataStore.query(Product)).filter((product)=>{product.title==text})
  // }


  return (
    <SafeAreaView style={{ backgroundColor: '#4487c7' }}>
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
            borderRadius: 10,
            marginRight: 40,
            marginBottom: 10,
            marginLeft: 40,
            marginTop: 10,
            flex:1,
          }}>
          <Feather name="search" size={20} />
          <TextInput
            style={{ height: 40, marginLeft: 10, marginRight: 50 }}
            placeholder="Search..."
            value={searchValue}
            onChangeText={setSearchValue}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const HomeStack = () => {
  const [searchValue, setSearchValue] = useState('');


 
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => (
          <HeaderComponent
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        ),
        headerShown:false
      }}>
      <Stack.Screen
        name="HomeScreen"
        options={{ title: 'Home' }}>
        {() => <HomeScreen
          searchValue={searchValue}
        />}
      </Stack.Screen>
      <Stack.Screen component={ProductScreen} name="ProductDetails"
        options={{
          headerShown: false
        }} />
    </Stack.Navigator>
  );
};

export default HomeStack;

//Les elements tapes dans le SetSearch doivent etre envoyes au component (ici HeaderComponent) puis la searchValue sera envoye dans le HomeScreen
//Pour envoyer un element dans le HomeScreen on doit le definir dans headerComponent
//Dans le textInput du Header component  value={searchValue}
//Dans StackScreen specifique au HomeScreen ==> 1-On l'etend et on ajoute une fonction  {() => <HomeScreen searchValue={searchValue}/>} ==> Cette methode permet d'envoyer la valeur de la recherche dans le HomeScreen