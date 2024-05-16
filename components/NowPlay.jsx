import {useState, useEffect, useCallback} from 'react';
import fetchApi from '../hooks/useApi';

export default function usePlay() {
  const [play, setPlay] = useState([]);

  useEffect(() => {
    fetchPlay();
  }, []);

  const fetchPlay = useCallback(() => {
    fetchApi('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1')
      .then(data => {
        setPlay(data.results);
      });
  }, []);

  return [play, setPlay];
}
