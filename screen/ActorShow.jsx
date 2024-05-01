import {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, ScrollView} from 'react-native';
import ActorCredit from './ActorCredit';
import TopPeople from './TopActor';

export default function ActorShow({route,navigation}) {
  const {id} = route.params;
  const {movie} = route.params;
  const [actor, setActor] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/person/${id}?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setActor(data);
      });
  }, []);
  return (
    <ScrollView style={{backgroundColor: 'black', flex: 1}}>
      <Text
        style={{
          color: 'white',
          marginTop: 10,
          fontSize: 30,
          fontWeight: 'bold',
          alignSelf: 'center',
        }}>
        {actor.name}
      </Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
        }}
        style={{
          width: 200,
          height: 200,
          marginTop: 30,
          marginBottom: 30,
          borderRadius: 50,
          alignSelf: 'center',
        }}
      />

      <Text
        style={{
          color: 'white',
          marginHorizontal: 30,
        }}>
        DOB: {actor.birthday}
      </Text>

      <Text
        style={{
          color: 'white',
          marginHorizontal: 30,
          textAlign: 'justify',
          margin: 10,
        }}>
        Department: {actor.known_for_department}
      </Text>
      <Text style={{color: 'white', marginHorizontal: 30}}>About</Text>
      <Text
        style={{
          color: 'white',
          marginHorizontal: 30,
          textAlign: 'justify',
          margin: 10,
        }}>
        {actor.biography}
      </Text>
      <Text style={{fontSize: 30, marginHorizontal:20, fontWeight: 'bold',textAlign:"center",marginTop:10,color:"red"}}>
        Works
      </Text>
      <View style={{margin:10}}>
        <ActorCredit aid={id} navigation={navigation}/>
      </View>
    </ScrollView>
  );
}
