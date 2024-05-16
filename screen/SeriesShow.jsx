import {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {SeriesData} from '../components/SeriesData';

export function SeriesShow({route, navigation}) {
  const {seriesId} = route.params;
  const [series, setSeries] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSeriesDetails();
    fetchSimilar();
  }, []);

  const fetchSeriesDetails = () => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setSeries(data);
        setLoading(false);
      });
  };

  const fetchSimilar = () => {
    fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/similar?language=en-US&page=1`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setSimilar(data.results);
        setLoading(false);
      });
  };

  const handleItemPress = item => {
    navigation.push('SeriesShow', {seriesId: item.id});
  };

  const ItemList = ({item}) => {
    return (
      <TouchableOpacity onPress={() => handleItemPress(item)}>
        <View style={styles.item}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.movieImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.movieTitle}>{item.original_name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loadingIndicator}
        />
      ) : (
        <FlatList
          keyExtractor={item => item.id}
          data={similar}
          numColumns={2}
          renderItem={({item}) => <ItemList item={item} />}
          ListHeaderComponent={<SeriesData series={series} />}
        />
      )}
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  seriesImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  seriesContainer: {
    marginRight: 10,
    marginLeft: 10,
  },
  seriesTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },

  textContainer: {
    width: 120,
  },
  movieTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  movieImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  textContainer: {
    width: 120,
  },
  item: {
    width: windowWidth / 2,
    alignItems: 'center',
    padding: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container:{
    backgroundColor: 'black',
    flex: 1
  }
});
