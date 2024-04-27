import React, { useState } from 'react';
import { FlatList, Text, View, Image } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { useMovie } from '../hooks/useMovie';
import { MovieTop } from '../components/MovieTop';

export default function SearchScreen() {
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
            <View style={{ marginVertical: 10, alignItems: 'center' }}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  style={{ width: 200, height: 300 }}
                />
                <Text style={{ color: 'black', textAlign: 'center' }}>
                  {item.original_title}
                </Text>
              </View>
            </View>
          )}
        />
      ) : null}
    </View>
  );
}
