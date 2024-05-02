import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

export default function MovieShow({route, navigation}) {
  const {movieId} = route.params;

  const [movie, setMovies] = useState([]);
  const [review, setReview] = useState('');
  const [reviewsData, setReviewsData] = useState([]);

  useEffect(() => {
    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      });

    // Fetch reviews
    fetch(`http://172.27.16.1:3000/api/v1/movies/${movieId}/reviews`)
      .then(response => response.json())
      .then(data => {
        console.log('Reviews data:', data);
        setReviewsData(data.reviews);
      });
  }, [movieId]);

  // const handleReviewSubmit = () => {

  //   console.log('Review Submitted:', review);
  //   setReview('');
  // };

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      {movie && (
        <View>
          <View>
            <Text style={styles.title}>{movie.original_title}</Text>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={styles.itemImage}
            />
          </View>
          <Text style={styles.itemText}>
            <Text style={{fontWeight: 'bold'}}>Original Language: </Text>{' '}
            {movie.original_language}
          </Text>
          <Text style={styles.itemText}>
            <Text style={{fontWeight: 'bold'}}>Popularity: </Text>
            {movie.popularity}
          </Text>
          <Text style={styles.itemText}>
            <Text style={{fontWeight: 'bold'}}>Vote Average: </Text>
            {movie.vote_average}
          </Text>
          <Text style={styles.itemText}>
            <Text style={{fontWeight: 'bold'}}>Release Date: </Text>
            {movie.release_date}
          </Text>

          <Text
            style={styles.itemText}>
            {movie.overview}
          </Text>
        </View>
      )}

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          marginHorizontal: 10,
        }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'white',
            padding: 10,
            borderRadius: 10,
            height: 40,
            flex: 1,
          }}
          value={review}
          onChangeText={text => setReview(text)}
        />
        <Button
          title="Save"
          onPress={handleReviewSubmit}
          style={{ height: 40 }}
        />
      </View> */}

      {/* Display reviews */}

      {/* {reviewsData.map((review, index) => (
          <Text key={index} style={{ fontSize: 16, color: 'white' }}>
            {review.description}
          </Text>
        ))} */}
      {/* 
        <FlatList 
        keyExtractor={item=>item.id}
        data={reviewsData}
        renderItem={({item})=>(
          <Text>{item.description}</Text>
        )}
        /> */}
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
  itemText:{
    fontSize: 15, 
    textAlign: 'center', 
    marginBottom: 5
  }
});
