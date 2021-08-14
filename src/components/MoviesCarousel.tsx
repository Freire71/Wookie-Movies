import React from 'react';
import styled from 'styled-components/native';
import { FlatList, ListRenderItemInfo } from 'react-native';
import CarouselCard from './CarouselCard';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { testID } from '../utils/Tests';

const Container = styled.View`
  width: 100%;
  padding-left: 16px;
  margin-bottom: 12px;
`;
const GenreTitle = styled.Text`
  font-family: ${(props) => props.theme.Barlow_500Medium};
  font-size: ${responsiveScreenFontSize(3.5)}px;
  color: #fff;
  margin-bottom: 6px;
`;

const Divider = styled.View`
  width: 12px;
`;

export interface IMoviesCarouselProps {
  genreTitle: string;
  data: IMovie[];
  onMovieClick: (movie: IMovie) => void;
}

export type IMovie = {
  backdrop: string;
  cast: string[];
  classification: string;
  director: string | string[];
  genres: string[];
  id: string;
  imdb_rating: number;
  length: string;
  overview: string;
  poster: string;
  released_on: string;
  slug: string;
  title: string;
};

const MoviesCarousel = ({
  data,
  genreTitle,
  onMovieClick,
}: IMoviesCarouselProps) => {
  const keyExtractor = (item: IMovie, index: number) => `${item.id}/${index}`;
  const renderItem = ({ item, index }: ListRenderItemInfo<IMovie>) => {
    return (
      <CarouselCard
        movie={item}
        onMovieClick={onMovieClick}
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
