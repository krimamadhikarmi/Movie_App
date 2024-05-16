import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {MovieData} from '../components/MovieData';
import fetchApi from '../hooks/useApi';

export default function MovieShow({route, navigation}) {
  const {movieId} = route.params;

  const [movie, setMovie] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
  }, []);

  const fetchMovieDetails = () => {
    // setLoading(true);
    // fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
    //   headers: {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
    //   },
    // })
    //   .then(response => response.json())
    fetchApi(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`)
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching movie details:', error));
  };

  const fetchSimilarMovies = () => {
    fetchApi(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    )
      .then(data => {
        setSimilar(data.results);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching similar movies:', error));
  };

  const handleItemPress = item => {
    navigation.push('Show', {movieId: item.id});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.item}>
        <Image
          source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
          style={styles.movieImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.movieTitle}>{item.original_title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          ListHeaderComponent={<MovieData movie={movie} />}
          data={similar}
          numColumns={2}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  movieTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    width: 120,
  },
  item: {
    width: windowWidth / 2,
    alignItems: 'center',
    padding: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
