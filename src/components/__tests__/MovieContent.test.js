import React from 'react';
import 'react-native';
import { render } from '../../utils/Tests';
import MovieContent from '../MovieContent';

describe('<MovieContent />', () => {
  it('should render properly ', () => {
    const synopse = 'lorem ipsum dolorem';
    const cast = ['Jose', 'Maria', 'Marco'];
    const castDisplayedValue = cast.join(', ');
    const { getByText } = render(
      <MovieContent synopse={synopse} cast={cast} />
    );
    const synopseComponent = getByText(synopse);
    const castComponent = getByText(castDisplayedValue);

    expect(synopseComponent).toBeTruthy();
    expect(castComponent).toBeTruthy();
  });
});
