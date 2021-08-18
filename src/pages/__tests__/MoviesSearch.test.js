import 'react-native';
import React from 'react';
import { movies, pageRender, fireEvent } from '../../utils/Tests';
import MoviesSearch from '../MoviesSearch';
import { getMoviesSearch } from '../../api/hooks/movies';

jest.mock('../../api/hooks/movies', () => ({
  getMoviesSearch: jest.fn(),
}));

describe('<MoviesSearchPage />', () => {
  let navigation;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
    };
  });
  it('should render component properly', () => {
    getMoviesSearch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: { data: { movies } },
    }));

    const { getAllByTestId, getByText, getByTestId } = pageRender(
      <MoviesSearch navigation={navigation} />
    );
    expect(getAllByTestId('movie-card-image')).toHaveLength(3);
    expect(getAllByTestId('movie-card-image')[0]).toHaveProp('source', {
      uri: movies[0].poster,
    });
  });
  it('should render list message component when api request fails', () => {
    getMoviesSearch.mockImplementation(() => ({
      isLoading: false,
      isError: true,
    }));

    const { getByText } = pageRender(<MoviesSearch navigation={navigation} />);
    expect(
      getByText('Ops... Something went wrong. Please try again later')
    ).toBeTruthy();
  });

  it('should render activity indicator component when api is loading data', () => {
    getMoviesSearch.mockImplementation(() => ({
      isLoading: true,
      isError: false,
    }));

    const { getByTestId } = pageRender(
      <MoviesSearch navigation={navigation} />
    );
    expect(getByTestId('movies-search-activity-indicator')).toBeDefined();
  });

  it('should call refetch method when user end typing', () => {
    const refetch = jest.fn();
    getMoviesSearch.mockImplementation(() => ({
      isLoading: true,
      isError: false,
      refetch,
      data: { data: { movies } },
    }));

    const { getByTestId } = pageRender(
      <MoviesSearch navigation={navigation} />
    );
    fireEvent(getByTestId('movies-search-text-input'), 'onChangeText', 'abc');
    fireEvent(getByTestId('movies-search-text-input'), 'onEndEditing');

    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('should navigate to movie details page when press on a movie poster', () => {
    getMoviesSearch.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: { data: { movies } },
    }));
    const { getAllByTestId } = pageRender(
      <MoviesSearch navigation={navigation} />
    );
    const moviesPoster = getAllByTestId('movie-card-image');
    fireEvent(moviesPoster[0], 'onPress');
    expect(navigation.navigate).toHaveBeenCalledWith('MovieDetails', {
      movie: movies[0],
    });
  });
});
