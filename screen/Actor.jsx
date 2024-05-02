import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default function ActorCombine({ route, navigation }) {
  const { id } = route.params;
  const [actor, setActor] = useState([]);
  const [actorCredit, setActorCredit] = useState([]);

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
    fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setActorCredit(data.cast);
      })
      .catch(error => console.error('Error fetching actor credits:', error));
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
      </View>
    );
  };

  const filterMovie = actorCredit && actorCredit.length > 10 ? actorCredit.slice(0, 10) : actorCredit;

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <FlatList
        ListHeaderComponent={renderHeader}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        data={filterMovie}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Show', { movieId: item.id })}>
            <View style={styles.item}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.itemImage}
              />
              <Text style={styles.itemText}>{item.title}</Text>
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
    color: "green",
  },
  headerImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerBio: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 35,
  },
  item: {
    width: windowWidth / 2,
    alignItems: 'center',
    padding:10
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
    color: 'white',
    borderRadius: 5,
  },
});
