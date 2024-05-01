import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { SearchBar } from '../components/SearchBar';
import { useMovie } from '../hooks/useMovie';
import MovieList from '../components/MovieList';
import { Trending } from '../components/Trending';

export default function SearchScreen({ navigation }) {
  const [term, setTerm] = useState('');
  const [movies, searchApi, errorMessage] = useMovie();
  const [showTrending, setShowTrending] = useState(true);

  const handleSearch = () => {
    if (term !== '') {
      setShowTrending(false);
      searchApi(term);
    } else {
      setShowTrending(true);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={handleSearch}
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {showTrending ? (
        <Trending navigation={navigation} />
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
  },
});
