import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet,Button} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeries } from '../redux/SeriesSlice';

export function SeriesScreen({ navigation }) {
  const [topSeries, setTopSeries] = useState([]);
  const [popular, setPopular] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [showAll, setShowAll] = useState(true); 
  const dispatch = useDispatch();
  const seriesList = useSelector(state=>state.seriesshow)

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


  const filteredSeries =()=>{
    if(showAll){
      return topSeries
    }
    else if(popular){
      return topSeries.filter(topSeries=>topSeries.popularity > 900.00)
    }
    else if (topRated){
      return topSeries.filter(topSeries=>topSeries.vote_average > 7.00)
    }
    else{
      return topSeries;
    }
  }

  const handlePopularSeries = () => {
    setPopular(true);
    setTopRated(false);
    setShowAll(false);
  };

  const handleTopRatedSeries = () => {
    setTopRated(true);
    setPopular(false);
    setShowAll(false);
  };

  const handleShowAllSeries = () => {
    setShowAll(true);
    setPopular(false);
    setTopRated(false);
  };



  const addSeries = series => {
    dispatch(fetchSeries(series));
  };
  return (
    <View style={styles.container}>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 10,
          marginTop:20
        }}>
        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
          <Button
            title="All"
            color={showAll ? 'purple' : 'gray'} 
            onPress={handleShowAllSeries}
            
          />
        </View>
        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
          <Button
            title="Popular"
            color={popular? 'blue':'gray'}
            onPress={handlePopularSeries}
            
          />
        </View>
        <View style={{ borderRadius: 50, overflow: 'hidden' }}>
          <Button title="Top Rated" 
           color={topRated? 'red':'gray'}
           onPress={handleTopRatedSeries}
           />
        </View>
      </View>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={filteredSeries()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            addSeries(item)
            navigation.navigate('Series', { seriesId: item.id })}}>
            <View style={styles.seriesItemContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
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
    backgroundColor:"black",
  },
  seriesImage: {
    width: 300,
    height: 400,
    borderRadius: 10,
    marginBottom: 10,
  },
  seriesTitle: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color:"red",
    fontSize:20
  },
});
