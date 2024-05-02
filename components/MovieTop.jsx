import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  Button,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FetchMovie} from '../redux/MovieSlice';
import usePlay from './NowPlay';
import useComing from './UpcomingMovie';
import FilterButton from './MovieButton';

export function MovieTop({navigation}) {
  const [topMovies, setTopMovies] = useState([]);
  const [popular, setPopular] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [play, setPlay] = usePlay();
  const [nowPlay, setNowPlay] = useState(false);
  const [coming, setComing] = useComing();
  const [upcoming, setUpComing] = useState(false);

  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieshow);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
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
    } else if (nowPlay) {
      return play;
    } else if (upcoming) {
      return coming;
    } else {
      return topMovies;
    }
  };

  const handlePopularPress = () => {
    setPopular(true);
    setTopRated(false);
    setShowAll(false);
    setNowPlay(false);
    setUpComing(false);
  };

  const handleTopRatedPress = () => {
    setTopRated(true);
    setPopular(false);
    setShowAll(false);
    setNowPlay(false);
    setUpComing(false);
  };

  const handleShowAllPress = () => {
    setShowAll(true);
    setPopular(false);
    setTopRated(false);
    setNowPlay(false);
    setUpComing(false);
  };

  const handlePlay = () => {
    setNowPlay(true);
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
    setUpComing(false);
  };

  const handleComing = () => {
    setNowPlay(false);
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
    setUpComing(true);
  };

  const addMovie = movie => {
    dispatch(FetchMovie(movie));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black', padding: 10}}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginBottom: 10}}>
        
          <FilterButton
            title="All Movies"
            onPress={handleShowAllPress}
            isActive={showAll}
          />
          <FilterButton
            title="Popular"
            onPress={handlePopularPress}
            isActive={popular}
          />
          <FilterButton
            title="Top Rated"
            onPress={handleTopRatedPress}
            isActive={topRated}
          />
          <FilterButton
            title="Now Playing"
            onPress={handlePlay}
            isActive={nowPlay}
          />
          <FilterButton
            title="Upcoming"
            onPress={handleComing}
            isActive={upcoming}
          />
      </ScrollView>

      <FlatList
        keyExtractor={item => item.id.toString()}
        data={filterMovies()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              addMovie(item);
              navigation.navigate('Show', {movieId: item.id});
            }}>
            <View
              style={{
                alignItems: 'center',
                marginVertical: 10,
                backgroundColor: 'black',
                borderRadius: 10,
                padding: 10,
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{width: 300, height: 400, borderRadius: 10}}
              />
              <Text
                style={{
                  color: 'gray',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginTop: 5,
                  fontSize: 18,
                }}>
                {item.original_title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
