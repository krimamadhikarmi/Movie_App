import React, {memo, useMemo} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const MovieList = memo(({imageUrl, title}) => {
  const imageSource = useMemo(() => ({uri: imageUrl}), [imageUrl]);
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.itemImage} />
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default MovieList;
