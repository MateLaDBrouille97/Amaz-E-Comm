import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ImageCarousel from '../ImageCarousel';
import { Widget } from '../../models';




  
const WidgetItem = ({item}) => {
  return (
    <View style={styles.page}>
      <ImageCarousel images={item?.images} />
      <Text style={[styles.title,{textAlign:"right"}]}>{item?.title}</Text>
    </View>
  )
}

export default WidgetItem

const styles = StyleSheet.create({
  page:{
    padding:10,
  },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: "center",
        alignItems:"center",
        color:'#446475',
    }
})