import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  VirtualizedList,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {FetchMovie} from '../redux/MovieSlice';

import usePlay from '../components/NowPlay';
import useComing from '../components/UpcomingMovie';
import FilterButton from '../components/Button';
import fetchApi from '../hooks/useApi';

const MovieTop = ({navigation}) => {
  const [popular, setPopular] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [play, setPlay] = usePlay();
  const [nowPlay, setNowPlay] = useState(false);
  const [coming, setComing] = useComing();
  const [upcoming, setUpComing] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const movieList = useSelector(state => state.movieshow);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = () => {
    // fetch(
    //   'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
    //   {
    //     headers: {
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
    //     },
    //   },
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     setTopMovies(data.results);
    //     setLoading(false);
    //   });
    fetchApi('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')
      .then(data => {
      setTopMovies(data.results);
      setLoading(false);
    });
  };

  const filterMovies = useMemo(() => {
    let filteredMovies = topMovies;
    if (!showAll) {
      if (popular) {
        filteredMovies = filteredMovies.filter(
          movie => movie.popularity > 1200.0,
        );
      } else if (topRated) {
        filteredMovies = filteredMovies.filter(
          movie => movie.vote_average > 7.0,
        );
      } else if (nowPlay) {
        filteredMovies = play;
      } else if (upcoming) {
        filteredMovies = coming;
      }
    }
    return filteredMovies;
  }, [showAll, popular, topRated, nowPlay, upcoming, topMovies, play, coming]);

  const handlePopularPress = useCallback(() => {
    setPopular(true);
    setTopRated(false);
    setShowAll(false);
    setNowPlay(false);
    setUpComing(false);
  }, []);

  const handleTopRatedPress = useCallback(() => {
    setTopRated(true);
    setPopular(false);
    setShowAll(false);
    setNowPlay(false);
    setUpComing(false);
  }, []);

  const handleShowAllPress = useCallback(() => {
    setShowAll(true);
    setPopular(false);
    setTopRated(false);
    setNowPlay(false);
    setUpComing(false);
  }, []);

  const handlePlay = useCallback(() => {
    setNowPlay(true);
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
    setUpComing(false);
  }, []);

  const handleComing = useCallback(() => {
    setUpComing(true);
    setNowPlay(false);
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
  }, []);

  const addMovie = movie => {
    dispatch(FetchMovie(movie));
  };

  const handleItemPress = useCallback(item => {
    addMovie(item);
    navigation.navigate('Show', {movieId: item.id});
  }, []);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.container}>
          <Image
            source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
            style={styles.movieImage}
          />
          <Text style={styles.movieText}>{item.original_title}</Text>
        </View>
      </TouchableOpacity>
    ),
    [handleItemPress],
  );

  const filterbutton = [
    {title: 'All Movies', onPress: handleShowAllPress, isActive: showAll},
    {title: 'Popular', onPress: handlePopularPress, isActive: popular},
    {title: 'Top Rated', onPress: handleTopRatedPress, isActive: topRated},
    {title: 'Now Playing', onPress: handlePlay, isActive: nowPlay},
    {title: 'Upcoming', onPress: handleComing, isActive: upcoming},
  ];

  return (
    <View style={styles.viewItem}>
      <FlatList
        horizontal
        keyExtractor={(item, index) => item.title}
        data={filterbutton}
        renderItem={({item}) => (
          <FilterButton
            title={item.title}
            onPress={item.onPress}
            isActive={item.isActive}
          />
        )}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loadingIndicator}
        />
      ) : (
        <VirtualizedList
          showsVerticalScrollIndicator={false}
          data={filterMovies}
          initialNumToRender={4}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          getItemCount={() => filterMovies.length}
          getItem={(data, index) => data[index]}
        />
      )}
    </View>
  );
};

export default MovieTop;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  errorText: {
    alignSelf: 'center',
    marginVertical: 20,
    color: 'red',
    fontSize: 16,
  },
  movieImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  movieText: {
    color: 'gray',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewItem: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
});
