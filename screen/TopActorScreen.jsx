import {useState, useEffect, useCallback, memo} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchActor} from '../redux/ActorSlice';
import fetchApi from '../hooks/useApi';

const TopPeople = ({navigation}) => {
  const [people, setPeople] = useState();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const actorList = useSelector(state => state.actorshow);

  useEffect(() => {
    // setLoading(true);
    // fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', {
    //   headers: {
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
    //   },
    // })
    //   .then(response => response.json())
    fetchApi(
      'https://api.themoviedb.org/3/person/popular?language=en-US&page=1',
    ).then(data => {
      setPeople(data.results);
      setLoading(false);
    });
  }, []);

  const addActor = useCallback(
    actor => {
      dispatch(fetchActor(actor));
    },
    [dispatch],
  );

  const handleItemPress = item => {
    addActor(item);
    navigation.navigate('Act', {
      id: item.id,
      movie: item.known_for,
    });
  };

  const renderItem = useCallback(
    ({item}) => (
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => {
            handleItemPress(item);
          }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
            }}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    ),
    [handleItemPress],
  );

  const filterPeople =
    people && people.length > 10 ? people.slice(0, 10) : people;
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
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.name}
          numColumns={2}
          data={filterPeople}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    maxWidth: windowWidth / 2,
    alignItems: 'center',
    margin: 10,
  },
  itemText: {
    color: 'gray',
    margin: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    margin: 8,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default TopPeople;
