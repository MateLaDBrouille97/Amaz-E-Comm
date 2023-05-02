import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal:10,
    flex:1,
    
  },
 
  rightContainer: {
    padding: 10,
    
    alignItems: 'center',
    margin :10,
  },
  title: {
    marginTop:5,
    fontSize: 18,
  },
  price: {
    marginTop:30,
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
});

export default styles;