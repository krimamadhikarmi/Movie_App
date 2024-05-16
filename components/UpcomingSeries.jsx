import {useState, useEffect, useCallback} from 'react';
import fetchApi from '../hooks/useApi';

export default function useComingSeries() {
  const [coming, setComing] = useState([]);

  const fetchUpcoming =useCallback( () => {
    fetchApi('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1')
      .then(data => {
        setComing(data.results);
      });
  },[]);

  useEffect(() => {
    fetchUpcoming();
  }, []);

  return [coming, setComing];
}
