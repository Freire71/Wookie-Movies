import 'react-native';
import React from 'react';
import { render, fireEvent } from '../../utils/Tests';
import MovieCard, { hints } from '../MovieCard';

const movie = {
  backdrop:
    'https://wookie.codesubmit.io/static/backdrops/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg',
  cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
  classification: '13+',
  director: 'Christopher Nolan',
  genres: ['Action', 'Crime', 'Drama'],
  id: 'd6822b7b-48bb-4b78-ad5e-9ba04c517ec8',
  imdb_rating: 9.0,
  length: '2h 32min',
  overview:
    'Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.',
  poster:
    'https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg',
  released_on: '2008-07-16T00:00:00',
  slug: 'the-dark-knight-2008',
  title: 'The Dark Knight',
};

describe('<MovieCard />', () => {
  it('should render component properly', () => {
    const onMoviePressFn = jest.fn();
    const { getByA11yHint, getByTestId } = render(
      <MovieCard
        movie={movie}
        onMoviePress={onMoviePressFn}
        testID="card-container"
      />
    );
    const image = getByA11yHint(hints.cardImage);
    const cardContainer = getByTestId('card-container');

    fireEvent(cardContainer, 'onPress');
    expect(onMoviePressFn).toHaveBeenCalled();
    expect(onMoviePressFn).toHaveBeenCalledTimes(1);
    expect(onMoviePressFn).toHaveBeenCalledWith(movie);
    expect(image).toHaveProp('source', { uri: movie.poster });
  });
});
