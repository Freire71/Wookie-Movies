import React, { useState, useEffect } from 'react';
import { FlatList, ListRenderItemInfo, Platform } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ParamsList } from '../../App';
import MoviesCarousel from '../components/MoviesCarousel';
import styled from 'styled-components/native';
import { Movie } from '../api/types/movie';
import { getMovies } from '../api/hooks/movies';
import ActivityIndicator from '../components/ActivityIndicator';
import ListMessage from '../components/ListMessage';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export interface ICarouselData {
  genreTitle: string;
  data: Movie[];
}

const Container = styled.SafeAreaView`
  background-color: #1c1c26;
  flex: 1;
  padding-top: 6px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts.Barlow_700Bold};
  margin-bottom: 12px;
  color: #fff;
  font-size: ${responsiveFontSize(3.25)}px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 12px;
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

interface IProps extends BottomTabScreenProps<ParamsList, 'Home'> {}

const Home = ({ navigation }: IProps) => {
  const [movies, setMovies] = useState<ICarouselData[] | []>([]);
  const { data, isError, isLoading } = getMovies();

  useEffect(() => {
    if (!isError && !isLoading && data) {
      setMovies(formatMoviesPayload(data.data.movies));
    }
  }, [isLoading, isError]);

  const onMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  const keyExtractor = (item: ICarouselData, index: number) =>
    `${item.genreTitle}/${index}`;

  const renderItem = ({ item }: ListRenderItemInfo<ICarouselData>) => {
    return (
      <MoviesCarousel
        data={item.data}
        genreTitle={item.genreTitle}
        onMoviePress={onMoviePress}
      />
    );
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return (
      <ListMessage title="Ops... Something went wrong. Please try again later." />
    );
  }

  return (
    <Container>
      <FlatList
        ListHeaderComponent={() => <Title>Wookie Movies</Title>}
        data={movies}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Container>
  );
};

export default Home;
