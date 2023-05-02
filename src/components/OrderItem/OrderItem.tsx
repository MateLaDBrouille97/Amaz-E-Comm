import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import styles2 from './styles2';

const OrderItem = ({ item }) => {
  return (
    <View style={styles2.root}>
      
      <View style={styles2.rightContainer}>
        <Text style={[styles2.title,{fontSize: 22}]} numberOfLines={3}>
          {item?.fullName}
        </Text>
        <Text style={[styles2.title,{fontSize: 14}]} >{item.phoneNumber}</Text>
        <Text style={[styles2.title,{fontSize: 16}]}>{item.country}</Text>
        <Text style={[styles2.title,{fontSize: 16}]}>{item.city}</Text>
        <Text style={[styles2.title,{fontSize: 12}]}>{item.adress}</Text>
      </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({})