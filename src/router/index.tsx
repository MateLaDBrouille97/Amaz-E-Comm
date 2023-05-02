import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNav from './bottomTabNavigator';

const Root = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer >
    <Root.Navigator screenOptions={{headerShown: false}}>
      <Root.Screen component={BottomTabNav} name="HomeTabs" />
    </Root.Navigator>
  </NavigationContainer>
  )
}

export default Router;

const styles = StyleSheet.create({})

//Pour la Navigation 3 elements:
//1- Creer un router avec NavigationContainer contenant Root.Navigator qui contient les composants
//2- Root.Screen contient la branche principale 
//3- Definir les differentes branches 
//
