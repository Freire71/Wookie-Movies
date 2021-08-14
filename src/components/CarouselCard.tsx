import React from 'react';
import styled from 'styled-components/native';
import { IMovie } from './MoviesCarousel';

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

interface ICarouselCardProps {
  onMovieClick: (movie: IMovie) => void;
  movie: IMovie;
  testID?: string;
}

export const CarouselCard = ({
  movie,
  testID,
  onMovieClick,
}: ICarouselCardProps) => {
  return (
    <Container testID={testID} onPress={() => onMovieClick(movie)}>
      <Image
        accessibilityHint={hints.cardImage}
        source={{
          uri: movie.poster,
        }}
      />
    </Container>
  );
};

export default CarouselCard;
