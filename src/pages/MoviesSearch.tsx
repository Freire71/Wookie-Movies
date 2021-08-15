import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

import { ParamsList } from '../../App';
import { Movie } from '../api/types/movie';
import { getMoviesSearch } from '../api/hooks/movies';
import MoviesSearchInput from '../components/MoviesSearchInput';
import MoviesSearchList from '../components/MoviesSearchList';

interface IProps extends BottomTabScreenProps<ParamsList, 'MoviesSearch'> {}

const androidTopMargin = Platform.OS === 'android' ? 24 : 0;

const Container = styled.SafeAreaView`
  background-color: #1c1c26;
  flex: 1;
  margin-top: ${androidTopMargin}px;
`;

const MoviesSearch = ({ navigation }: IProps) => {
  const [movieToSearch, setMovieToSearch] = useState('');
  const [moviesFound, setMoviesFound] = useState([]);
  const { refetch, data, error, isLoading } = getMoviesSearch(movieToSearch);

  useEffect(() => {
    if (!isLoading && !error && data) {
      setMoviesFound(data.data.movies);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    refetch();
  }, [movieToSearch]);

  const onMovieClick = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const onSearch = (movieName: string) => {
    setMovieToSearch(movieName);
  };

  return (
    <Container>
      <MoviesSearchInput onSearch={onSearch} isFetching={isLoading} />
      <MoviesSearchList
        data={moviesFound}
        onMovieClick={onMovieClick}
        failedToFech={!!error}
        isFetching={isLoading}
      />
    </Container>
  );
};

export default MoviesSearch;
