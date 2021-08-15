import React from 'react';
import { ScrollView } from 'react-native';
import MovieInfoBox from './MovieInfoBox';

interface IMovieInfoCarousel {
  releaseYear: string;
  genre: string | string[];
  director: string | string[];
  length: string;
}

const MovieInfoCarousel = ({
  releaseYear,
  genre,
  director,
  length,
}: IMovieInfoCarousel) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <MovieInfoBox data={releaseYear} type="releaseYear" />
      <MovieInfoBox data={length} type="length" />
      <MovieInfoBox data={director} type="director" />
      <MovieInfoBox data={genre} type="genre" />
    </ScrollView>
  );
};

export default MovieInfoCarousel;
