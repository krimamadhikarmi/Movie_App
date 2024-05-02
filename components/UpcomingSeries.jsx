import {useState, useEffect} from 'react';

export default function useComingSeries() {
  const [coming, setComing] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
      },
    })
      .then(response => response.json())
      .then(data => {
        setComing(data.results);
      });
  }, []);

  return [coming,setComing];
}
