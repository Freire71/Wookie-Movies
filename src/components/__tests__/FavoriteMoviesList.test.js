import 'react-native';
import React from 'react';
import { render, movies, fireEvent } from '../../utils/Tests';
import FavoriteMoviesList from '../FavoriteMoviesList';

const moviesList = [movies[0], movies[1]];

describe('<FavoriteMoviesList />', () => {
  it('should render component properly', () => {
    const { getByText, getAllByTestId } = render(
      <FavoriteMoviesList data={moviesList} onMoviePress={jest.fn()} />
    );
    const listItems = getAllByTestId('favorite-movies-list-item-container');
    const images = getAllByTestId('favorite-movies-list-item-image');
    const movie1 = getByText(movies[0].title);
    const movie2 = getByText(movies[1].title);

    expect(listItems.length).toBe(moviesList.length);
    expect(movie1).toBeDefined();
    expect(movie2).toBeDefined();
    expect(images[0]).toHaveProp('source', { uri: movies[0].backdrop });
    expect(images[1]).toHaveProp('source', { uri: movies[1].backdrop });
  });
  it('should call onPress function passing movie as parameter when it gets pressed', () => {
    const onMoviePress = jest.fn();
    const { getAllByTestId } = render(
      <FavoriteMoviesList data={moviesList} onMoviePress={onMoviePress} />
    );
    const images = getAllByTestId('favorite-movies-list-item-image');

    fireEvent(images[0], 'onPress');
    expect(onMoviePress).toHaveBeenCalledWith(movies[0]);

    fireEvent(images[1], 'onPress');
    expect(onMoviePress).toHaveBeenCalledWith(movies[1]);
  });
  it("should show list message component when there's no favorited movies", () => {
    const { getByText, getAllByTestId } = render(
      <FavoriteMoviesList data={[]} onMoviePress={jest.fn()} />
    );
    try {
      getAllByTestId('favorite-movies-list-item-container');
    } catch (err) {
      expect(err).toBeDefined(); // There are no list items
    }

    const messageTitle = getByText(
      'You do not have marked any movie as your favorite'
    );
    const messageSubtitle = getByText(
      'To favorite a movie press the ♡ icon on the movie details page'
    );

    expect(messageTitle).toBeDefined();
    expect(messageSubtitle).toBeDefined();
  });
});
