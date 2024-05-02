import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSeries} from '../redux/SeriesSlice';
import useComingSeries from '../components/UpcomingSeries';
import usePlaySeries from '../components/PlayingSeries';
import FilterButton from '../components/Button';

export function SeriesScreen({navigation}) {
  const [topSeries, setTopSeries] = useState([]);
  const [popular, setPopular] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [coming, setComing] = useComingSeries();
  const [upcoming, setUpcoming] = useState(false);
  const [play, setPlay] = usePlaySeries();
  const [nowAir, setnowAir] = useState(false);
  const dispatch = useDispatch();
  const seriesList = useSelector(state => state.seriesshow);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setTopSeries(data.results);
      });
  }, []);

  const filteredSeries = () => {
    if (showAll) {
      return topSeries;
    } else if (popular) {
      return topSeries.filter(topSeries => topSeries.popularity > 900.0);
    } else if (topRated) {
      return topSeries.filter(topSeries => topSeries.vote_average > 7.0);
    } else if (upcoming) {
      return coming;
    } else if (nowAir) {
      return play;
    } else {
      return topSeries;
    }
  };

  const handlePopularSeries = () => {
    setPopular(true);
    setTopRated(false);
    setShowAll(false);
    setUpcoming(false);
    setnowAir(false);
  };

  const handleTopRatedSeries = () => {
    setTopRated(true);
    setPopular(false);
    setShowAll(false);
    setUpcoming(false);
    setnowAir(false);
  };

  const handleShowAllSeries = () => {
    setShowAll(true);
    setPopular(false);
    setTopRated(false);
    setUpcoming(false);
    setnowAir(false);
  };

  const handleUpcoming = () => {
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
    setUpcoming(true);
    setnowAir(false);
  };

  const handleonAir = () => {
    setShowAll(false);
    setPopular(false);
    setTopRated(false);
    setUpcoming(false);
    setnowAir(true);
  };

  const addSeries = series => {
    dispatch(fetchSeries(series));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{margin: 15}}>
        <FilterButton
          title="All Series"
          onPress={handleShowAllSeries}
          isActive={showAll}
        />
        <FilterButton
          title="Popular"
          onPress={handlePopularSeries}
          isActive={popular}
        />
        <FilterButton
          title="Top Rated"
          onPress={handleTopRatedSeries}
          isActive={topRated}
        />
        <FilterButton
          title="Now Playing"
          onPress={handleonAir}
          isActive={nowAir}
        />
        <FilterButton
          title="Upcoming"
          onPress={handleUpcoming}
          isActive={upcoming}
        />
      </ScrollView>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        data={filteredSeries()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              addSeries(item);
              navigation.navigate('Series', {seriesId: item.id});
            }}>
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
        )}
      />
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
});
