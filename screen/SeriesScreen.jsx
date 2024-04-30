import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export function SeriesScreen({ navigation }) {
  const [topSeries, setTopSeries] = useState([]);

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

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id.toString()}
        data={topSeries}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Series', { seriesId: item.id })}>
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
    backgroundColor: 'white',
  },
  seriesItemContainer: {
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
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
  },
});
