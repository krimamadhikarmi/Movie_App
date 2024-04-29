// SearchScreen.js
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { useMovie } from '../hooks/useMovie';
import  MovieList  from '../components/MovieList';

export default function SearchScreen({navigation}) {
  const [term, setTerm] = useState('');
  const [movies, searchApi, errorMessage] = useMovie();

  return (
    <View style={{ flex: 1 }}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {movies.length > 0 ? (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={movies}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=> {navigation.navigate('Show'),{ movieId: item.id }}}>
            <MovieList
              imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              title={item.original_title}
              
            />
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
}
