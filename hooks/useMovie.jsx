import {useState} from 'react';
import fetchApi from './useApi';

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function searchApi(term) {
    fetchApi(
      `https://api.themoviedb.org/3/search/multi?query=${term}&include_adult=false&language=en-US&page=1`,
    ).then(data => {
      if (data.results) {
        setMovies(data.results);
        setError('');
        setLoading(false);
      } else {
        setError('No results found.');
      }
    });
  }

  return [movies, searchApi, errorMessage, loading, setLoading];
}
