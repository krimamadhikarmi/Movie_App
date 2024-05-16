import React, {useCallback, useState, memo} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  VirtualizedList,
  ActivityIndicator,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import {useMovie} from '../hooks/useMovie';
import MovieList from '../components/MovieList';
import Trending from '../components/TrendingMovie';

const SearchScreen = ({navigation}) => {
  const [term, setTerm] = useState('');
  const [movies, searchApi, errorMessage, loading] = useMovie();
  const [showTrending, setShowTrending] = useState(true);

  const handleSearch = useCallback(() => {
    if (term !== '') {
      setShowTrending(false);
      searchApi(term);
    } else {
      setShowTrending(true);
    }
  },[term]);

  const handleItemPress = item => {
    item.media_type == 'movie'
      ? navigation.navigate('Show', {movieId: item.id})
      : navigation.navigate('SeriesShow', {seriesId: item.id});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.movieItemContainer}
      onPress={() => {
        handleItemPress(item);
      }}>
      <MovieList
        imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        title={item.media_type == 'movie' ? item.title : item.original_name}
        mid={item.id}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={handleSearch}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {showTrending ? (
        <Trending navigation={navigation} />
      ) : (
        <>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#ffffff"
              style={styles.loadingIndicator}
            />
          ) : (
            <VirtualizedList
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              data={movies}
              getItem={(data, index) => data[index]}
              getItemCount={() => movies.length}
              initialNumToRender={5}
              renderItem={renderItem}
            />
          )}
        </>
      )}
    </View>
  );
};

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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SearchScreen;
