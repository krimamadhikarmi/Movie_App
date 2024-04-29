// MovieList.js
import React from 'react';
import { View, Text, Image } from 'react-native';

const MovieList = ({ imageUrl,title,mid}) => {
  return (
    <View style={{ marginVertical: 10, alignItems: 'center' }}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: 200, height: 300 }}
      />
      <Text style={{ color: 'black', textAlign: 'center' }}>{title}</Text>
      <Text style={{color:'black'}}>{mid}</Text>
    </View>
  );
};

export default MovieList;
