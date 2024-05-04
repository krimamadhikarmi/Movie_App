import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {SearchBar} from '../components/SearchBar';
import {useMovie} from '../hooks/useMovie';
import MovieList from '../components/MovieList';
import {Trending} from '../components/TrendingMovie';
import {FetchMovie} from '../redux/MovieSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function SearchScreen({navigation}) {
  const [term, setTerm] = useState('');
  const [movies, searchApi, errorMessage] = useMovie();
  const [showTrending, setShowTrending] = useState(true);
  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieshow);

  const handleSearch = () => {
    if (term !== '') {
      setShowTrending(false);
      searchApi(term);
    } else {
      setShowTrending(true);
    }
  };

  const addMovie = movie => {
    dispatch(FetchMovie(movie));
  };

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
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={movies}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.movieItemContainer}
              onPress={() => {
                addMovie(item);
                item.media_type == 'movie'
                ? navigation.navigate('Show', {movieId: item.id})
                : navigation.navigate('SeriesShow', {seriesId: item.id})
              }}>
              <MovieList
                imageUrl={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                title={item.media_type=="movie" ? item.title :item.original_name}
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
