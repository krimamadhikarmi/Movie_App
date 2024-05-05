import React, {useState, useEffect} from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import FilterButton from '../components/Button';

export default function ActorCombine({route, navigation}) {
  const {id} = route.params;
  const [actor, setActor] = useState([]);
  const [actorCredit, setActorCredit] = useState([]);
  const [series, setSeries] = useState(false);
  const [movie, setMovie] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchActorDetails();
    fetchActorCredits();
  }, []);

  const fetchActorDetails = () => {
    fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setActor(data);
      })
      .catch(error => console.error('Error fetching actor details:', error));
  };

  const fetchActorCredits = () => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/combined_credits?language=en-US`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setActorCredit(data.cast);
      })
      .catch(error => console.error('Error fetching actor credits:', error));
  };

  const filterCredits = () => {
    let filteredCredits = actorCredit;
    if (movie) {
      filteredCredits = filteredCredits.filter(
        credit => credit.media_type === 'movie',
      );
    } else if (series) {
      filteredCredits = filteredCredits.filter(
        credit => credit.media_type === 'tv',
      );
    }
    return showAll ? filteredCredits : filteredCredits.slice(0, 6);
  };

  const handleMovie = () => {
    setMovie(true);
    setSeries(false);
  };

  const handleSeries = () => {
    setMovie(false);
    setSeries(true);
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{actor.name}</Text>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
          }}
          style={styles.headerImage}
        />
        <Text style={styles.headerBio}>{actor.biography}</Text>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>Works</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <FilterButton
            title={'movies'}
            onPress={handleMovie}
            isActive={movie}
          />
          <FilterButton
            title={'series'}
            onPress={handleSeries}
            isActive={series}
          />
        </View>
        {actorCredit.length > 10 && !showAll && (
        <TouchableOpacity onPress={() => setShowAll(true)} style={styles.button}>
          <Text style={styles.buttonText}>View All</Text>
        </TouchableOpacity>
      )}
      {showAll && (
        <TouchableOpacity onPress={() => setShowAll(false)} style={styles.button}>
          <Text style={styles.buttonText}>Show Less</Text>
        </TouchableOpacity>
      )}
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        data={filterCredits()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              item.media_type == 'movie'
                ? navigation.navigate('Show', { movieId: item.id })
                : navigation.navigate('SeriesShow', { seriesId: item.id })
            }>
            <View style={styles.item}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>
                {item.media_type === 'movie' ? item.title : item.original_name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
  
      
    </View>
  );
  
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'crimson',
  },
  headerImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerBio: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 35,
  },
  item: {
    width: windowWidth / 2,
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemText: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 12,
    color: 'crimson',
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    overflow:"hidden"
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
