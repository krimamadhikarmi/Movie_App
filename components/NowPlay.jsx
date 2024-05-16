import {useState, useEffect, useCallback} from 'react';

export default function usePlay() {
  const [play, setPlay] = useState([]);

  useEffect(() => {
    fetchPlay();
  }, []);

  const fetchPlay = useCallback(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setPlay(data.results);
      });
  }, []);

  

  return [play, setPlay];
}
