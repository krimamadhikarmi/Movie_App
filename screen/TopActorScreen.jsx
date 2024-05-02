import {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchActor} from '../redux/ActorSlice';

export default function TopPeople({navigation}) {
  const [people, setPeople] = useState();

  const dispatch = useDispatch();
  const actorList = useSelector(state => state.actorshow);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setPeople(data.results);
      });
  }, []);

  const addActor = actor => {
    dispatch(fetchActor(actor));
  };

  const filterPeople =
    people && people.length > 10 ? people.slice(0, 10) : people;
  return (
    <View style={{backgroundColor: 'black'}}>
      <FlatList
       showsVerticalScrollIndicator={false}
        keyExtractor={item => item.name}
        numColumns={2}
        data={filterPeople}
        renderItem={({item}) => (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                addActor(item);
                navigation.navigate('Act', {
                  id: item.id,
                  movie: item.known_for,
                });
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                }}
                style={{width: 100, height: 100, borderRadius: 60, margin: 8}}
              />
              <Text
                style={{
                  color: 'gray',
                  margin: 8,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  item: {
    flex: 1,
    maxWidth: windowWidth / 2,
    alignItems: 'center',
    margin: 10,
  },
});
