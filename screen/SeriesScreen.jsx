import {FlatList, Image, Text, View} from 'react-native';
import {useState, useEffect} from 'react';

export function SeriesScreen() {
  const [topSeries, setTopSeries] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setTopSeries(data.results);
      });
  }, []);
  return (
    <View style={{backgroundColor:"white"}}>
      <FlatList
        keyExtractor={item => item.id}
        data={topSeries}
        renderItem={({item}) => (
          <View style={{alignItems: 'center'}}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={{width: 200, height: 200,marginTop:10}}
            />
            <Text style={{fontWeight:'bold'}}>{item.original_name}</Text>
          </View>
        )}
      />
    </View>
  );
}
