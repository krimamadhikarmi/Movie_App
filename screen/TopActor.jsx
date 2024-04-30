import {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import ActorCredit from './ActorCredit';
import ActorShow from './ActorShow';

export default function TopPeople({navigation}) {
  const [people, setPeople] = useState();

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

  return (
    <View style={{backgroundColor: 'black'}}>
      <FlatList
        keyExtractor={item => item.id}
        data={people}
        renderItem={({item}) => (
          <View style={{alignItems: 'center', margin: 20}}>
            <TouchableOpacity onPress={() => navigation.navigate('Actor',{ id: item.id,movie:item.known_for})}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                }}
                style={{width: 100, height: 100, borderRadius: 60, margin: 8}}
              />
              <Text style={{color: 'white', margin: 8, fontWeight: 'bold'}}>
                {item.name}
              </Text>
              <Text style={{color: 'white'}}>{item.id}</Text>
            </TouchableOpacity>
            
          </View>
        )}
      />
    </View>
  );
}