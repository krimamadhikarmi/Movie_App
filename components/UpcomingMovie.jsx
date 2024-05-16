import {useState,useEffect, useCallback} from 'react';
import fetchApi from '../hooks/useApi';

export default function useComing() {
  const [coming, setComing] = useState([]);

  const fetchComing=useCallback(()=>{
    fetchApi('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1')
      .then(data => {
        setComing(data.results);
      });

  },[])
  useEffect(() => {
    fetchComing();
  }, []);

  return [coming,setComing];
}
