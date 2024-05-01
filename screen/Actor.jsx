import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
  const filterMovie = actorCredit && actorCredit.length>10? actorCredit.slice(0 , 10): actorCredit
  return (
    <View style={{backgroundColor:"black"}}>
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
            style={{ width: 150, height: 200,borderRadius:20}}
          />
          <Text style={styles.itemText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
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
  itemText: {
    textAlign: 'center',
    fontSize: 15,
    marginBottom:12,
  },
  item: {
    flex: 1,
    maxWidth: "40%", // 100% devided by the number of rows you want
    alignItems: "center",
    marginHorizontal:20,
    marginLeft:39,
  }
});
