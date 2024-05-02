import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function Trending({ navigation }) {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/trending/all/day?language=en-US',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setTrending(data.results);
      });
  }, []);

  return (
   
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={trending}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Show', { movieId: item.id })}>
            <View style={{ alignItems: 'center', marginVertical: 10, backgroundColor: 'black', borderRadius: 10, padding: 10 }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{ width: 300, height: 400, borderRadius: 10 }}
              />
              <Text style={{ color: 'gray', textAlign: 'center', fontWeight: 'bold', marginTop: 5,fontSize:18 }}>
                {item.original_title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
  
  );
}
