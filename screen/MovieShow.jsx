import {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';


export default function MovieShow({route,navigation}) {
  const { movieId } = route.params;

  const [movie, setMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      });
  });

  return (
    <View style={{alignItems:'center'}}>
      <View style={{ marginVertical: 10, alignItems: 'center' }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={{ width: 200, height: 300 }}
          />
          
        </View>
   
      <Text>Movie ID:{movie.id}</Text>
      <Text>Original Language:{movie.original_language}</Text>
      <Text>Overview:{movie.overview}</Text>
      
     
      {/* <FlatList
          keyExtractor={item => item.id.toString()}
          data={movie}
          renderItem={({item})=>(
            <Text style={{ color: 'black', textAlign: 'center' }}>{item.id}</Text>
        )}
        /> */}
    </View>
  );
}
