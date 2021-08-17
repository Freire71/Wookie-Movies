import React from 'react';
import styled from 'styled-components/native';
import { FlatList, ListRenderItemInfo } from 'react-native';
import MovieCard from './MovieCard';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { testID } from '../utils/Tests';
import { Movie } from '../api/types/movie';

const Container = styled.View`
  width: 100%;
  padding-left: 16px;
  margin-bottom: 12px;
`;
const GenreTitle = styled.Text`
  font-family: ${(props) => props.theme.fonts.Barlow_500Medium};
  font-size: ${responsiveScreenFontSize(3.5)}px;
  color: #fff;
  margin-bottom: 6px;
`;

const Divider = styled.View`
  width: 12px;
`;

export interface IMoviesCarouselProps {
  genreTitle: string;
  data: Movie[];
  onMoviePress: (movie: Movie) => void;
}

const MoviesCarousel = ({
  data,
  genreTitle,
  onMoviePress,
}: IMoviesCarouselProps) => {
  const keyExtractor = (item: Movie, index: number) => `${item.id}/${index}`;
  const renderItem = ({ item, index }: ListRenderItemInfo<Movie>) => {
    return (
      <MovieCard
        movie={item}
        onMoviePress={onMoviePress}
        {...testID(`movie-card`)}
      />
    );
  };
  return (
    <Container>
      <GenreTitle>{genreTitle}</GenreTitle>
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
        horizontal
        ItemSeparatorComponent={() => <Divider />}
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

export default MoviesCarousel;
