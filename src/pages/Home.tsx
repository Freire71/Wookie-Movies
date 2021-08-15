import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItemInfo, Platform } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamsList } from '../../App';
import MoviesCarousel from '../components/MoviesCarousel';
import styled from 'styled-components/native';
import { Movie } from '../api/types/movie';
import { getMovies } from '../api/hooks/movies';
import ActivityIndicator from '../components/ActivityIndicator';

interface IProps extends BottomTabScreenProps<ParamsList, 'Home'> {}

export interface ICarouselData {
  genreTitle: string;
  data: Movie[];
}

const androidTopMargin = Platform.OS === 'android' ? 24 : 0;

const Container = styled.SafeAreaView`
  background-color: #1c1c26;
  flex: 1;
  margin-top: ${androidTopMargin}px;
`;

const formatMoviesPayload = (movies: Movie[]) => {
  const categoriesMap = new Map();
  movies.forEach((movie: Movie) =>
    movie.genres.forEach((genre) => {
      if (!categoriesMap.has(genre)) {
        categoriesMap.set(genre, [movie]);
      } else {
        categoriesMap.get(genre).push(movie);
      }
    })
  );
  let formatedData = [];
  categoriesMap.forEach((value, key) => {
    formatedData.push({
      genreTitle: key,
      data: value,
    });
  });
  return formatedData;
};

const Home = ({ navigation }: IProps) => {
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const { data, error, isLoading } = getMovies();

  useEffect(() => {
    if (!error && !isLoading && data) {
      setMovies(formatMoviesPayload(data.data.movies));
    }
  }, [data, isLoading]);

  const onMovieClick = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const keyExtractor = (item: ICarouselData, index: number) =>
    `${item.genreTitle}/${index}`;

  //TODO: add correct type
  const renderItem = ({ item }: ListRenderItemInfo<any>) => {
    return (
      <MoviesCarousel
        data={item.data}
        genreTitle={item.genreTitle}
        onMovieClick={onMovieClick}
      />
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <Container>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Container>
  );
};

export default Home;
