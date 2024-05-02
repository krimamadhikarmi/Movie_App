import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, Button, FlatList } from 'react-native';

export default function MovieShow({ route, navigation }) {
  const { movieId } = route.params;

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
        console.log("Reviews data:", data);
        setReviewsData(data.reviews);
      });
  }, [movieId]);

  // const handleReviewSubmit = () => {
  
  //   console.log('Review Submitted:', review);
  //   setReview('');
  // };

  return (
    <ScrollView style={{ backgroundColor: 'black', flex: 1 }}>
      {movie && (
        <View>
          <View style={{ marginVertical: 20, alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 30,
                margin: 10,
                fontWeight: 'bold',
                color: 'white',
                textAlign:"center"
              }}>
              {movie.original_title}
            </Text>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={{ width: 200, height: 300, borderRadius: 20 }}
            />
          </View>
          <Text style={{ fontSize: 15 ,textAlign:"center"}}>
          <Text style={{fontWeight:"bold"}}>Original Language: </Text> {movie.original_language}
          </Text>
          <Text style={{ fontSize: 15,textAlign:"center"}}><Text style={{fontWeight:"bold"}}>Popularity: </Text>{movie.popularity}</Text>
          <Text style={{ fontSize: 15 ,textAlign:"center"}}><Text style={{fontWeight:"bold"}}>Vote Average: </Text>{movie.vote_average}</Text>
          <Text style={{ fontSize: 15 ,textAlign:"center"}}><Text style={{fontWeight:"bold"}}>Release Date: </Text>{movie.release_date}</Text>
        
          <Text
            style={{
              fontSize: 16,
              marginHorizontal: 10,
              textAlign: 'center',
              marginTop: 8,
            }}>
            {' '}
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
      <View style={{ marginTop: 20, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 20, color: 'white', marginBottom: 10 }}>
          Reviews:
        </Text>
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
      </View>
    </ScrollView>
  );
}
