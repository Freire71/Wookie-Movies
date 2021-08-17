import React from 'react';
import styled from 'styled-components/native';
import { Movie } from '../api/types/movie';
import { testID } from '../utils/Tests';

const Image = styled.Image`
  width: 175px;
  height: 275px;
  resize-mode: contain;
`;

const Container = styled.TouchableOpacity`
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;
  elevation: 2;
`;

export const hints = {
  cardImage: 'When clicked, you will navigate to movie details page',
};

interface IMovieCardProps {
  onMoviePress: (movie: Movie) => void;
  movie: Movie;
  testID?: string;
}

export const MovieCard = ({
  movie,
  testID: propTestID,
  onMoviePress,
}: IMovieCardProps) => {
  return (
    <Container testID={propTestID} onPress={() => onMoviePress(movie)}>
      <Image
        {...testID('movie-card-image')}
        accessibilityHint={hints.cardImage}
        source={{
          uri: movie.poster,
        }}
      />
    </Container>
  );
};

export default MovieCard;
