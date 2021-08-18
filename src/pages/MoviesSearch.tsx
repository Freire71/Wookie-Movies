import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

import { ParamsList } from '../../App';
import { Movie } from '../api/types/movie';
import { getMoviesSearch } from '../api/hooks/movies';
import MoviesSearchInput from '../components/MoviesSearchInput';
import MoviesSearchList from '../components/MoviesSearchList';

const Container = styled.SafeAreaView`
  background-color: #1c1c26;
  flex: 1;
  padding-top: 6px;
`;

interface IProps extends BottomTabScreenProps<ParamsList, 'MoviesSearch'> {}

const MoviesSearch = ({ navigation }: IProps) => {
  const [movieToSearch, setMovieToSearch] = useState('');
  const [moviesFound, setMoviesFound] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { refetch, data, isError, isLoading } = getMoviesSearch(movieToSearch);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      setIsFetching(false);
      setMoviesFound(data.data.movies);
    }
    if (isError) {
      setIsFetching(false);
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (movieToSearch.length > 0) {
      setIsFetching(true);
      refetch();
    }
  }, [movieToSearch]);

  const onMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const onSearch = (movieName: string) => {
    setMovieToSearch(movieName);
  };
  return (
    <Container>
      <MoviesSearchInput onSearch={onSearch} isFetching={isFetching} />
      <MoviesSearchList
        data={moviesFound}
        onMoviePress={onMoviePress}
        failedToFech={isError}
        isFetching={isFetching}
      />
    </Container>
  );
};

export default MoviesSearch;
