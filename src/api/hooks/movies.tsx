import { useQuery } from 'react-query';
import { get } from '..';
import { IMovie } from '../types/movie';

type MoviesPayload = {
  movies: IMovie[];
};

export const getMovies = () => {
  return useQuery('movies', () => {
    return get<MoviesPayload>('/movies');
  });
};

