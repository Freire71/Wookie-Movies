import 'react-native';
import React from 'react';
import { render, movies, fireEvent } from '../../utils/Tests';
import MoviesSearchList from '../MoviesSearchList';

const moviesList = [movies[0], movies[1]];

describe('<MoviesSearchList />', () => {
  it('should render component properly', () => {
    const { getAllByTestId } = render(
      <MoviesSearchList
        data={moviesList}
        onMoviePress={jest.fn()}
        failedToFech={false}
        isFetching={false}
      />
    );
    const listItems = getAllByTestId('movies-search-list-item');
    const images = getAllByTestId('movie-card-image');

    expect(listItems.length).toBe(moviesList.length);
    expect(images[0]).toHaveProp('source', { uri: movies[0].poster });
    expect(images[1]).toHaveProp('source', { uri: movies[1].poster });
  });
  it("should display error message when there's no data and no fetching is ocurring", () => {
    const { getByText } = render(
      <MoviesSearchList
        data={[]}
        onMoviePress={jest.fn()}
        failedToFech={true}
        isFetching={false}
      />
    );
    const errorMessage = getByText(
      'Ops... Something went wrong. Please try again later'
    );
    expect(errorMessage).toBeDefined();
  });
  it('should call onPress function passing movie as parameter when it gets pressed', () => {
    const onMoviePress = jest.fn();
    const { getAllByTestId } = render(
      <MoviesSearchList
        data={moviesList}
        onMoviePress={onMoviePress}
        failedToFech={false}
        isFetching={false}
      />
    );
    fireEvent.press(getAllByTestId('movie-card-image')[0]);
    expect(onMoviePress).toHaveBeenCalledWith(movies[0]);
  });
  it("should display empty list message when no data is found and there's no error", () => {
    const { getByText } = render(
      <MoviesSearchList
        data={[]}
        onMoviePress={jest.fn()}
        failedToFech={false}
        isFetching={false}
      />
    );
    const emptyMessage = getByText("Unfortunately we don't have this movie 😢");
    const emptySubtitle = getByText(
      'Try a different movie name or enjoy the movies available on our home page'
    );
    expect(emptyMessage).toBeDefined();
    expect(emptySubtitle).toBeDefined();
  });
});
