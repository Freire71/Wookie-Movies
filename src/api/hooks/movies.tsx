import { useQuery } from 'react-query';
import { get } from '..';
import { Movie } from '../types/movie';

type MoviesPayload = {
  movies: Movie[];
};

export const getMovies = () => {
  return useQuery('movies', () => {
    return get<MoviesPayload>('/movies');
  });
};

export const getMoviesSearch = (movieName: string) => {
  return useQuery(
    ['moviesSearch', movieName],
    () => {
      return get<MoviesPayload>(`/movies?q=${movieName}`);
    },
    { enabled: false }
  );
};
