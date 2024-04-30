import {Text, View} from 'react-native';
import {useState} from 'react';

export default function useSeries() {
  const [serie, setSerie] = useState([]);
  function searchApi({term}) {
    fetch(
      `https://api.themoviedb.org/3/search/tv?query=${term}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          setSerie(data.results);
        } else {
          <Text>Error</Text>;
        }
      });
    return [serie, searchApi];
  }
}
