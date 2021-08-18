import 'react-native';
import React from 'react';
import { movies, render, fireEvent } from '../../utils/Tests';
import MovieDetails from '../MovieDetails';

describe('<MovieDetailsPage />', () => {
  let navigation;
  const route = {
    params: {
      movie: movies[0],
    },
  };
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
    };
  });
  it('should render properly', () => {
    const { getByText, getAllByTestId, getByTestId } = render(
      <MovieDetails navigation={navigation} route={route} />
    );
    expect(getByText('The Dark Knight (9.0)')).toBeDefined();
    expect(getByText('2008')).toBeDefined();
    expect(getByText('2h 32min')).toBeDefined();
    expect(getByText('Christopher Nolan')).toBeDefined();
    expect(getByText('Action, Crime, Drama')).toBeDefined();
    expect(
      getByText(
        'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.'
      )
    ).toBeDefined();
    expect(getByText('Christian Bale, Heath Ledger, Aaron Eckhart'));
    expect(getAllByTestId('star')).toHaveLength(4);
    expect(getAllByTestId('half-star')).toHaveLength(1);
    expect(getByTestId('movie-details-backdrop')).toHaveProp('source', {
      uri: movies[0].backdrop,
    });
    expect(getByTestId('movie-details-poster')).toHaveProp('source', {
      uri: movies[0].poster,
    });
  });
});
