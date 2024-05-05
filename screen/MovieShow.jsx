import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function MovieShow({ route, navigation }) {
  const { movieId } = route.params;

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    fetchMovieDetails();
    fetchSimilarMovies();
  }, []);

  const fetchMovieDetails = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      })
      .catch(error => console.error('Error fetching movie details:', error));
  };

  const fetchSimilarMovies = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`, {
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setSimilar(data.results);
      })
      .catch(error => console.error('Error fetching similar movies:', error));
  };

  return (
    <ScrollView style={{ backgroundColor: 'black' }}>
      {movie && (
        <View>
          <View>
            <Text style={styles.title}>{movie.original_title}</Text>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.itemImage}
            />
          </View>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Original Language:</Text> {movie.original_language}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Popularity: </Text>
            {movie.popularity}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Vote Average: </Text>
            {movie.vote_average}
          </Text>
          <Text style={styles.itemText}>
            <Text style={styles.itemTitle}>Release Date: </Text>
            {movie.release_date}
          </Text>
          <Text style={styles.itemText}>{movie.overview}</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>Similar Movies</Text>
      <FlatList
        horizontal
        keyExtractor={item => item.id.toString()}
        data={similar}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.push('Show', { movieId: item.id })}>
            <View style={styles.movieContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.movieImage}
              />
              <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{item.original_title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 10,
    fontWeight: 'bold',
    color: 'crimson',
    textAlign: 'center',
  },
  itemImage: {
    width: 200,
    height: 300,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 15,
  },
  itemText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: 'crimson',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    color: 'white',
  },
  movieContainer: {
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    width: 120,
  },
});
