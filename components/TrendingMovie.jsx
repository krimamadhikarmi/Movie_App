import React, {useCallback, useEffect, useState, memo} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  VirtualizedList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {addtrendMovie} from '../redux/TrendSlice';
import {useDispatch, useSelector} from 'react-redux';
import fetchApi from '../hooks/useApi';

const Trending = ({navigation}) => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const trendList = useSelector(state => state.trendmovie);

  useEffect(() => {
    fetchTrending();
  }, []);


  const fetchTrending = useCallback(() => {
    fetchApi('https://api.themoviedb.org/3/trending/all/day?language=en-US')
      .then(data => {
        setTrending(data.results);
        setLoading(false);
      });
  }, []);

  
  const trendMovie = useCallback(
    trend => {
      dispatch(addtrendMovie(trend));
    },
    [dispatch],
  );

  const handleItemPress = item => {
    trendMovie(item);
    item.media_type == 'movie'
      ? navigation.navigate('Show', {movieId: item.id})
      : navigation.navigate('SeriesShow', {seriesId: item.id});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        handleItemPress(item);
      }}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          }}
          style={styles.itemImage}
        />
        <Text style={styles.itemText}>
          {item.media_type == 'movie' ? item.title : item.original_name}
        </Text>
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
        <VirtualizedList
          keyExtractor={item => item.id.toString()}
          data={trending}
          initialNumToRender={5}
          renderItem={renderItem}
          getItemCount={() => trending.length}
          getItem={(data, index) => data[index]}
        />
      )}
    </View>
  );
};

export default Trending;

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  itemImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  itemContainer: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
  },
  itemText: {
    color: 'gray',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
  },
});
