import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { useMovie } from '../hooks/useMovie';
import MovieList from '../components/MovieList';
import { MovieTop } from '../components/MovieTop';

export default function SearchScreen({ navigation }) {
  const [term, setTerm] = useState('');
  const [movies, searchApi, errorMessage] = useMovie();

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      {movies.length > 0 ? (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={movies}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieItemContainer}
              onPress={() => navigation.navigate('Show', { movieId: item.id })}
            >
              <MovieList
                imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.original_title}
                mid={item.id}
              />
            </TouchableOpacity>
          )}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  errorText: {
    alignSelf: 'center',
    marginVertical: 20,
    color: 'red',
    fontSize: 16,
  },
  movieItemContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
