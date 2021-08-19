import 'react-native';
import React from 'react';
import { render, movies, fireEvent } from '../../utils/Tests';
import FavoriteMovies from '../FavoriteMovies';
import { useUserContext } from '../../providers/UserProvider';

jest.mock('../../providers/UserProvider', () => ({
  useUserContext: jest.fn(),
}));

describe('<FavoriteMoviesPage />', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  useUserContext.mockImplementation(() => ({
    getFavoriteMoviesList: () => [movies[0], movies[1]],
    favoriteMoviesMap: new Map(),
  }));
  it('should render component properly', () => {
    const { getAllByTestId, getByText } = render(
      <FavoriteMovies navigation={navigation} />
    );
    const moviesBackDrop = getAllByTestId('favorite-movies-list-item-image');
    expect(moviesBackDrop).toHaveLength(2);
    expect(moviesBackDrop[0]).toHaveProp('source', { uri: movies[0].backdrop });
    expect(moviesBackDrop[1]).toHaveProp('source', { uri: movies[1].backdrop });
    expect(getByText('My favorite movies')).toBeDefined();
    expect(getByText(movies[0].title)).toBeDefined();
    expect(getByText(movies[1].title)).toBeDefined();
  });

  it('should navigate to movie details page when a favorited movie is press', () => {
    const { getAllByTestId } = render(
      <FavoriteMovies navigation={navigation} />
    );
    fireEvent(getAllByTestId('favorite-movies-list-item-image')[0], 'onPress');
    expect(navigation.navigate).toHaveBeenCalledWith('MovieDetails', {
      movie: movies[0],
    });
  });
});
