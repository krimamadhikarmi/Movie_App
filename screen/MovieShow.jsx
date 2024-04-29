import React from 'react';
import { Text, View } from 'react-native';

export default function MovieShow({route}) { 
   
    const {movieId} = route.params ?? {};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Show Details for Movie ID: {movieId}</Text>
     
    </View>
  );
}
