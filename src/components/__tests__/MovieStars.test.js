import 'react-native';
import React from 'react';
import { render } from '../../utils/Tests';
import MovieStars from '../MovieStars';

describe('<MovieStars />', () => {
  it('should shender correctly - five stars', () => {
    const { getAllByTestId } = render(<MovieStars imdbRating={10} />);
    const stars = getAllByTestId('star');

    expect(stars.length).toBe(5);
  });
  it('should shender correctly - four stars and one empty star', () => {
    const { getAllByTestId } = render(<MovieStars imdbRating={8} />);
    const stars = getAllByTestId('star');
    const emptyStar = getAllByTestId('empty-star');

    expect(stars.length).toBe(4);
    expect(emptyStar.length).toBe(1);
  });
  it('should shender correctly - four stars, one half star and one empty star', () => {
    const { getAllByTestId } = render(<MovieStars imdbRating={7} />);
    const stars = getAllByTestId('star');
    const emptyStar = getAllByTestId('empty-star');
    const halfStar = getAllByTestId('half-star');

    expect(stars.length).toBe(3);
    expect(halfStar.length).toBe(1);
    expect(emptyStar.length).toBe(1);
  });
});
