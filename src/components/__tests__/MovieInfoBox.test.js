import 'react-native';
import React from 'react';
import { render } from '../../utils/Tests';
import MovieInfoBox from '../MovieInfoBox';

describe('<MovieInfo />', () => {
  it('should render correctly - director', () => {
    const { getByText, getByTestId } = render(
      <MovieInfoBox type="director" data="director1" />
    );
    const iconContainer = getByTestId('movie-info-director-icon');
    const value = getByText('director1');
    const category = getByText('Director (s)');

    expect(iconContainer).toBeTruthy();
    expect(value).toBeTruthy();
    expect(category).toBeTruthy();
  });
  it('should render correctly - directors', () => {
    const directors = ['director1', 'director2'];
    const displayedValue = directors.join(', ');
    const { getByText, getByTestId } = render(
      <MovieInfoBox type="director" data={directors} />
    );
    const iconContainer = getByTestId('movie-info-director-icon');
    const value = getByText(displayedValue);
    const category = getByText('Director (s)');

    expect(iconContainer).toBeTruthy();
    expect(value).toBeTruthy();
    expect(category).toBeTruthy();
  });
  it('should render correctly - year', () => {
    const { getByText, getByTestId } = render(
      <MovieInfoBox type="releaseYear" data="2014-11-14T00:00:00" />
    );
    const iconContainer = getByTestId('movie-info-releaseYear-icon');
    const value = getByText('2014');
    const category = getByText('Year');

    expect(iconContainer).toBeTruthy();
    expect(value).toBeTruthy();
    expect(category).toBeTruthy();
  });
  it('should render correctly - duration', () => {
    const { getByText, getByTestId } = render(
      <MovieInfoBox type="length" data="1h 54min" />
    );
    const iconContainer = getByTestId('movie-info-length-icon');
    const value = getByText('1h 54min');
    const category = getByText('Duration');

    expect(iconContainer).toBeTruthy();
    expect(value).toBeTruthy();
    expect(category).toBeTruthy();
  });
  it('should render correctly - genre', () => {
    const { getByText, getByTestId } = render(
      <MovieInfoBox type="genre" data="Drama" />
    );
    const iconContainer = getByTestId('movie-info-genre-icon');
    const value = getByText('Drama');
    const category = getByText('Genre (s)');

    expect(iconContainer).toBeTruthy();
    expect(value).toBeTruthy();
    expect(category).toBeTruthy();
  });
  it('should render correctly - genres', () => {
    const genres = ['Drama', 'Comedy'];
    const displayedValue = genres.join(', ');
    const { getByText, getByTestId } = render(
      <MovieInfoBox type="genre" data={genres} />
    );
    const iconContainer = getByTestId('movie-info-genre-icon');
    const value = getByText(displayedValue);
    const category = getByText('Genre (s)');

    expect(iconContainer).toBeTruthy();
    expect(value).toBeTruthy();
    expect(category).toBeTruthy();
  });
});
