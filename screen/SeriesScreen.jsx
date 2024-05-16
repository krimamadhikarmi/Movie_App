import React, {useState, useEffect, useMemo, useCallback, memo} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSeries} from '../redux/SeriesSlice';
import FilterButton from '../components/Button';
import useComingSeries from '../components/UpcomingSeries';
import usePlaySeries from '../components/PlayingSeries';

export function SeriesScreen({navigation}) {
  const [topSeries, setTopSeries] = useState([]);
  const [popular, setPopular] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [coming, setComing] = useComingSeries();
  const [upcoming, setUpcoming] = useState(false);
  const [play, setPlay] = usePlaySeries();
  const [nowAir, setNowAir] = useState(false);
  const dispatch = useDispatch();
  const seriesList = useSelector(state => state.seriesshow);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setTopSeries(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching series data:', error);
      });
  }, []);

  const filteredSeries = useMemo(() => {
    let filtered = topSeries;
    if (!showAll) {
      if (popular) {
        filtered = filtered.filter(series => series.popularity > 900.0);
      } else if (topRated) {
        filtered = filtered.filter(series => series.vote_average > 7.0);
      } else if (upcoming) {
        filtered = coming;
      } else if (nowAir) {
        filtered = play;
      }
    }
    return filtered;
  }, [showAll, topRated, popular, upcoming, coming, nowAir, play, topSeries]);

  const handlePopularSeries =useCallback( () => {
    setPopular(true);
    setTopRated(false);
    setShowAll(false);
    setUpcoming(false);
    setNowAir(false);
  },[]);

  const handleTopRatedSeries = useCallback(() => {
    setTopRated(true);
    setPopular(false);
    setShowAll(false);
    setUpcoming(false);
    setNowAir(false);
  },[]);

  const handleShowAllSeries =useCallback( () => {
    setShowAll(true);
    setPopular(false);
    setTopRated(false);
    setUpcoming(false);
    setNowAir(false);
  },[]);

  const handleUpcoming = useCallback(() => {
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
    setUpcoming(true);
    setNowAir(false);
  },[]);

  const handleonAir = useCallback(() => {
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
    setUpcoming(false);
    setNowAir(true);
  },[]);

  const addSeries = series => {
    dispatch(fetchSeries(series));
  };

  const filterButtons = useMemo(
    () => [
      {title: 'All Series', onPress: handleShowAllSeries, isActive: showAll},
      {title: 'Popular', onPress: handlePopularSeries, isActive: popular},
      {title: 'Top Rated', onPress: handleTopRatedSeries, isActive: topRated},
      {title: 'Upcoming', onPress: handleUpcoming, isActive: upcoming},
      {title: 'Now Playing', onPress: handleonAir, isActive: nowAir},
    ],
    [showAll, popular, topRated, upcoming, nowAir],
  );

  const handleItemPress = item => {
    addSeries(item);
    navigation.navigate('SeriesShow', {seriesId: item.id});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.seriesItemContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.seriesImage}
        />
        <Text style={styles.seriesTitle}>{item.original_name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        keyExtractor={(item, index) => item.title}
        data={filterButtons}
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
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          data={filteredSeries}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  seriesItemContainer: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'black',
  },
  seriesImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  seriesTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(SeriesScreen);
