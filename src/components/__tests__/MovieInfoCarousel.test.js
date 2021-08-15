import 'react-native';
import React from 'react';
import { render } from '../../utils/Tests';
import MovieInfoCarousel from '../MovieInfoCarousel';

describe('<MoviesInfoCarousel />', () => {
  it('should render properly ', () => {
    const { getByTestId } = render(
      <MovieInfoCarousel
        director="director 1"
        genre={['Drama', 'Comedy']}
        length="2h 41min"
        releaseYear="2014-11-14T00:00:00"
      />
    );
    const directorInfoBox = getByTestId('movie-info-director');
    const genreInfoBox = getByTestId('movie-info-genre');
    const lengthInfoBox = getByTestId('movie-info-length');
    const releaseYearInfoBox = getByTestId('movie-info-releaseYear');

    expect(directorInfoBox).toBeTruthy();
    expect(genreInfoBox).toBeTruthy();
    expect(lengthInfoBox).toBeTruthy();
    expect(releaseYearInfoBox).toBeTruthy();
  });
});
