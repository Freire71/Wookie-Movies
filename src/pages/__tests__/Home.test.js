import 'react-native';
import React from 'react';
import { movies, pageRender, fireEvent } from '../../utils/Tests';
import Home from '../Home';
import { getMovies } from '../../api/hooks/movies';

jest.mock('../../api/hooks/movies', () => ({
  getMovies: jest.fn(),
}));

describe('<HomePage />', () => {
  let navigation;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
    };
  });
  it('should render component properly', async () => {
    getMovies.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: { data: { movies } },
    }));
    const { getAllByTestId, getByText, getByTestId } = pageRender(
      <Home navigation={navigation} />
    );
    const images = getAllByTestId('movie-card-image');

    expect(images).toBeDefined();
    expect(getByText('Wookie Movies')).toBeDefined();
    expect(getByText('Action')).toBeDefined();
    expect(getByText('Crime')).toBeDefined();
    expect(getByText('Drama')).toBeDefined();
    expect(getByText('Animation')).toBeDefined();
    expect(getByText('Adventure')).toBeDefined();
    expect(getByText('Family')).toBeDefined();
    expect(getByTestId('Action-carousel').props.data.length).toBe(1);
    expect(getByTestId('Crime-carousel').props.data.length).toBe(2);
    expect(getByTestId('Drama-carousel').props.data.length).toBe(2);
    expect(getByTestId('Animation-carousel').props.data.length).toBe(1);
    expect(getByTestId('Adventure-carousel').props.data.length).toBe(1);
    expect(getByTestId('Family-carousel').props.data.length).toBe(1);
  });

  it('should render list message component when api request fails', async () => {
    getMovies.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      data: null,
    }));
    const { getByText } = pageRender(<Home navigation={navigation} />);
    expect(
      getByText('Ops... Something went wrong. Please try again later.')
    ).toBeDefined();
  });

  it('should render activity indicator component when api is loading data', async () => {
    getMovies.mockImplementation(() => ({
      isLoading: true,
      isError: false,
      data: null,
    }));
    const { getByTestId } = pageRender(<Home navigation={navigation} />);

    expect(getByTestId('activity-indicator-container')).toBeDefined();
  });
  it('should navigate to movie details page when press on a movie poster', () => {
    getMovies.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: { data: { movies } },
    }));
    const { getAllByTestId } = pageRender(<Home navigation={navigation} />);
    const moviesPoster = getAllByTestId('movie-card-image');
    fireEvent(moviesPoster[0], 'onPress');
    expect(navigation.navigate).toHaveBeenCalledWith('MovieDetails', {
      movie: movies[0],
    });
  });
});
