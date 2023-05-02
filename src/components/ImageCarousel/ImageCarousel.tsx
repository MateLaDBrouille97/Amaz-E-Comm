import React, {useState, useCallback} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

const ImageCarousel = ({images}: {images: string[]|undefined|null}) => {
  const [activeIndex, setActiveIndex] = useState(0);//Connaitre l'index de l'image active 
  const windowWidth = useWindowDimensions().width;

  const onFlatlistUpdate = useCallback(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
    console.log(viewableItems);
  }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <Image
            style={[styles.image, {width: windowWidth - 40}]}
            source={{uri: item}}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 50,
        }}
        onViewableItemsChanged={onFlatlistUpdate}
      />

      <View style={styles.dots}>
        {images?.map((image, index) => (
          <View
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
// Image Carousel recoit un array d'images ==> Pour montrer une list d'elements on utilise FLATLIST
//ici le carrousel est sous la forme d'une FlatList ==> Ce a quoi doit ressembler le carousel est une liste d'images donc chaque element est une image 

//Si une image n'apparait pas c'est qu'il faut travailler sur la taille et l'epaisseur 

// {snapToInterval} a besoin de la width de chaque element et l'alignement {snapToAlignment} et {decelerationRate}
//C'est trois elements permettent de figer l'element que l'on fait bouger au centre de la fenetre 

//Si l'index de l'image montree est le meme que l'id de l'image l'index de vient noir (ce sont les 3 points(car 3 photos a montrer) sous la photo on constate que 1 seul des points est noir  )

const styles = StyleSheet.create({
  root: {},
  image: {
    margin: 10,
    height: 250,
    resizeMode: 'contain',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#ededed',
    borderColor: '#c9c9c9',
    margin: 5,
  },
});

export default ImageCarousel;