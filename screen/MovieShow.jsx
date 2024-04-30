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
    <View style={{alignItems:'center',backgroundColor:"gray",flex:1}}>
      <View style={{ marginVertical:20, alignItems: 'center' }}>
        <Text style={{fontSize:20,margin:10,fontWeight:"bold",color:"white"}}>{movie.original_title}</Text>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={{ width: 300, height: 400,borderRadius:20 }}
          />
          
        </View>
   
      <Text style={{fontSize:18}}>Movie ID:{movie.id}</Text>
      <Text style={{fontSize:15}}>Original Language: {movie.original_language}</Text>
      <Text style={{fontSize:13,marginHorizontal:10,textAlign:"justify",marginTop:8}}>Overview:{movie.overview}</Text>
      
     
      
    </View>
  );
}
