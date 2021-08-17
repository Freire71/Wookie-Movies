import 'react-native';
import React from 'react';
import { render, movies, fireEvent } from '../../utils/Tests';
import FavoriteMoviesListItem from '../FavoriteMoviesListItem';

const movie = movies[0];

describe('<FavoriteMoviesListItem />', () => {
  it('should render component properly', () => {
    const { getByText, getByTestId } = render(
      <FavoriteMoviesListItem movie={movie} onMoviePress={jest.fn()} />
    );
    const movieTitle = getByText(movie.title);
    const listItemContainer = getByTestId(
      'favorite-movies-list-item-container'
    );
    const image = getByTestId('favorite-movies-list-item-image');

    expect(movieTitle).toBeDefined();
    expect(listItemContainer).toBeDefined();
    expect(image).toBeDefined();
    expect(image).toHaveProp('source', { uri: movie.backdrop });
  });

  it('should call onPress function with the image when it gets pressed', () => {
    const onMoviePress = jest.fn();
    const { getByTestId } = render(
      <FavoriteMoviesListItem movie={movie} onMoviePress={onMoviePress} />
    );
    const image = getByTestId('favorite-movies-list-item-image');

    fireEvent(image, 'onPress');

    expect(onMoviePress).toHaveBeenCalledWith(movie);
  });
});
