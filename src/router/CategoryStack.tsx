import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderScreen from '../screens/OrderScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator();

const CategoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen
        component={OrderScreen}
        name="HomeHomeScreen"
        options={{
          title: 'Opening',
          
      }}
      />
      <Stack.Screen
        component={CategoryScreen}
        name="Category"
        options={{title: 'Category'}}
      />
     <Stack.Screen 
     component={ProductScreen} 
     name="ProductDetails"
        options={{
          headerShown: false
        }} />
   
    </Stack.Navigator>
  );
};

export default CategoryStack;