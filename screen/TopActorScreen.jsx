import {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity,StyleSheet} from 'react-native';


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
        keyExtractor={item => item.name}
        numColumns={2}
        data={people}
        renderItem={({item}) => (
          <View style={styles.item}>
            <TouchableOpacity onPress={() => navigation.navigate('Act',{ id: item.id,movie:item.known_for})}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                }}
                style={{width: 100, height: 100, borderRadius: 60, margin: 8}}
              />
              <Text style={{color: 'white', margin: 8, fontWeight: 'bold',textAlign:"center"}}>
                {item.name}
              </Text>
             
            </TouchableOpacity>
            
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        maxWidth: "50%", 
        alignItems: "center",
    },
})