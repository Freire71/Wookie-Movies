import React from 'react';
import styled from 'styled-components/native';
import { Movie } from '../api/types/movie';
import { testID } from '../utils/Tests';

interface IFavoriteMovieListItemProps {
  movie: Movie;
  onMoviePress: (movie: Movie) => void;
}

const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  height: 100%;
`;

const MovieTitle = styled.Text<{ length: number }>`
  color: #fff;
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.Barlow_600SemiBold};
  margin-left: 6px;
  margin-bottom: 2px;
  text-shadow: 3px 3px 10px black;
`;

const Image = styled.ImageBackground`
  height: 200px;
  width: 100%;
  border-radius: 12px;
  margin-bottom: 4px;
`;

const TouchableContainer = styled.TouchableHighlight``;

const FavoriteMoviesListItem = ({
  movie,
  onMoviePress,
}: IFavoriteMovieListItemProps) => {
  const { title } = movie;
  return (
    <TouchableContainer
      onPress={() => onMoviePress(movie)}
      {...testID('favorite-movies-list-item-container')}
    >
      <Image
        {...testID('favorite-movies-list-item-image')}
        source={{ uri: movie.backdrop }}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <Container>
          <MovieTitle length={title.length}>{title}</MovieTitle>
        </Container>
      </Image>
    </TouchableContainer>
  );
};

export default FavoriteMoviesListItem;
