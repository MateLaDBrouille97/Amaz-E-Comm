import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ShoppingCartStack from './ShoppingCartStack';
import MenuScreen from '../screens/MenuScreen';
import OrderScreen from '../screens/OrderScreen';
import CategoryStack from './CategoryStack';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        inactiveTintColor: '#a4c1e0',
        activeTintColor: '#3a518c',
      }}>

      <Tab.Screen
        component={CategoryStack}
        name="Home"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="home" color={color} size={25} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        component={HomeStack}
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="user" color={color} size={25} />
          ),
          headerShown: false
        }}
      />

      <Tab.Screen
        component={ShoppingCartStack}
        name="ShoppingCart"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="shopping-cart" color={color} size={25} />
          ),
          headerShown: false
        }}
      />
      <Tab.Screen
        component={MenuScreen}
        name="more"
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name="menu" color={color} size={25} />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;