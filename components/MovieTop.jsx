import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity, Button } from 'react-native';
import { useDispatch,useSelector} from 'react-redux';
import { FetchMovie } from '../redux/MovieSlice';

export function MovieTop({ navigation }) {
  const [topMovies, setTopMovies] = useState([]);
  const [popular, setPopular] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [showAll, setShowAll] = useState(true); 
  const dispatch=useDispatch();
  const movieList = useSelector(state => state.movieshow);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      {
        headers: {
          Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setTopMovies(data.results);
      });
  }, []);

  const filterMovies = () => {
    if (showAll) {
      return topMovies;
    } else if (popular) {
      return topMovies.filter(movie => movie.popularity > 1200.0);
    } else if (topRated) {
      return topMovies.filter(movie => movie.vote_average > 7.0);
    } else {
      return topMovies;
    }
  };

  const handlePopularPress = () => {
    setPopular(true);
    setTopRated(false);
    setShowAll(false);
  };

  const handleTopRatedPress = () => {
    setTopRated(true);
    setPopular(false);
    setShowAll(false);
  };

  const handleShowAllPress = () => {
    setShowAll(true);
    setPopular(false);
    setTopRated(false);
  };


  const addMovie = movie => {
    dispatch(FetchMovie(movie));
  };



  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 10,
        }}>
        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
          <Button
            title="All Movies"
            onPress={handleShowAllPress}
            color={showAll ? 'purple' : 'gray'} 
          />
        </View>
        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
          <Button
            title="Popular"
            color={popular? 'blue':'gray'}
            onPress={handlePopularPress}
          />
        </View>
        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
          <Button title="Top Rated" 
           color={topRated? 'red':'gray'}
          onPress={handleTopRatedPress} />
        </View>
      </View>

      <FlatList
        keyExtractor={item => item.id.toString()}
        data={filterMovies()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => 
              { addMovie(item);
                navigation.navigate('Show', { movieId: item.id })}}
          >
            <View
              style={{
                alignItems: 'center',
                marginVertical: 10,
                backgroundColor: 'black',
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{ width: 300, height: 400, borderRadius: 10 }}
              />
              <Text
                style={{
                  color: 'gray',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 5,
                  fontSize: 18,
                }}
              >
                {item.original_title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
