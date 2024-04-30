import {useState, useEffect} from 'react';
import {FlatList, View, Text, TouchableOpacity,Image,StyleSheet} from 'react-native';

export default function ActorCredit({aid,navigation}) {
  const [credit, setCredit] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${aid}/movie_credits?language=en-US`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setCredit(data.cast);
      });
  }, []);
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        numColumns={2}
        data={credit}
        renderItem={({item}) => (
          <View style={styles.item}>
           
            <TouchableOpacity >
            <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={{ width: 150, height: 200,borderRadius:20,margin:50,marginHorizontal:20}}
          />
              <Text style={{color: 'white',textAlign:"center",fontSize:12}}>{item.title}</Text>
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
      maxWidth: "50%", // 100% devided by the number of rows you want
      alignItems: "center",
  }
})