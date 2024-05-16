import {useState,useEffect} from 'react';
import fetchApi from '../hooks/useApi';

export default function usePlaySeries() {
  const [play, setPlay] = useState([]);

  useEffect(() => {
    fetchApi('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1')
    .then(data => {
        setPlay(data.results);
    });
  }, []);

  return [play,setPlay];
}
