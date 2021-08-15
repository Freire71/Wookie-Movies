import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { testID } from '../utils/Tests';

const starColor = '#FFF';
const starSize = 25;

export interface IMovieStarsProps {
  imdbRating: number;
}

const StarContainer = styled.View`
  margin-right: 8px;
`;

export const MovieStars = ({ imdbRating }: IMovieStarsProps) => {
  const rating = imdbRating / 2;
  const numberOfFullStars = Math.floor(rating);
  const decimalPart = rating % 1;
  const totalNumberOfStars = numberOfFullStars + Math.round(decimalPart);
  const numberOfEmptyStars =
    totalNumberOfStars < 5 ? 5 - totalNumberOfStars : 0;

  const stars = [];
  for (let i = 0; i < numberOfFullStars; i++) {
    stars.push(
      <StarContainer {...testID('star')}>
        <FontAwesome size={starSize} name="star" color={starColor} />
      </StarContainer>
    );
  }
  if (decimalPart >= 0.5) {
    stars.push(
      <StarContainer {...testID('half-star')}>
        <FontAwesome size={starSize} name="star-half-full" color={starColor} />
      </StarContainer>
    );
  }

  for (let i = 0; i < numberOfEmptyStars; i++) {
    stars.push(
      <StarContainer {...testID('empty-star')}>
        <FontAwesome size={starSize} name="star-o" color={starColor} />
      </StarContainer>
    );
  }
  return (
    <React.Fragment>
      {stars.map((component, index) => (
        <React.Fragment key={index}>{component}</React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default MovieStars;
