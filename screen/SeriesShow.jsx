import {useEffect, useState} from 'react';
import {Image, Text, View, ScrollView, StyleSheet} from 'react-native';

export function SeriesShow({route}) {
  const {seriesId} = route.params;
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setSeries(data);
      });
  }, [setSeries]);

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      <Text style={styles.title}>{series.original_name}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
        }}
        style={styles.itemImage}
      />

      <Text style={styles.item}>
        <Text style={styles.itemTitle}>Popularity: </Text>
        {series.popularity}
      </Text>
      <Text style={styles.item}>
        <Text style={styles.itemTitle}>Vote Average: </Text>
        {series.vote_average}
      </Text>
      <Text style={styles.item}>
        <Text style={styles.itemTitle}>Vote Count: </Text>
        {series.vote_count}
      </Text>

      <Text style={styles.itemText}>
        <Text style={styles.itemTitle}>Seasons: </Text>
        {series.seasons?.length}
      </Text>

      <Text style={styles.itemText}>{series.overview}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'red',
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  item: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 300,
    height: 400,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 30,
    alignSelf: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 15,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: 'crimson',
  },
});
