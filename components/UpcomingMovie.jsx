import {useState,useEffect, useCallback} from 'react';

export default function useComing() {
  const [coming, setComing] = useState([]);

  const fetchComing=useCallback(()=>{
    fetch(
      'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDBhZWM4MjQzMmRhMGRhNjhkZTNkNGQ4Mjc3MzIxYyIsInN1YiI6IjY2MDY2NDc2MDIxY2VlMDE3YzQ3Y2ZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RUfaXmbhCzIDelgx91TFXb9ZhJvKyh-TBipPicBRvAo',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        setComing(data.results);
      });

  },[])
  useEffect(() => {
    fetchComing();
  }, []);

  return [coming,setComing];
}
