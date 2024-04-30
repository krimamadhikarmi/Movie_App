import {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';

export function SeriesShow({route}) {
  const {seriesId} = route.params;
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setSeries(data);
      });
  }, [setSeries]);

  return (
    <View style={{alignItems:"center",backgroundColor:"black",flex:1}}>
      <Text style={{color:"red",marginTop:10,fontSize:30,fontWeight:'bold'}}>{series.original_name}</Text>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${series.poster_path}`,
        }}
        style={{width: 300, height: 400, marginTop:30,marginBottom:30,borderRadius:10}}
      />
    
    <Text  style={{color:"white",marginHorizontal:10,textAlign:'justify',margin:10}}>ID: {series.id}</Text>
      <Text  style={{color:"white",marginHorizontal:10,textAlign:'justify'}}>{series.overview}</Text>
    </View>
  );
}
