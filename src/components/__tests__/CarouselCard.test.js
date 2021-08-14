import 'react-native';
import React from 'react';
import { render } from '../../utils/Tests';
import CarouselCard, { hints } from '../CarouselCard';

describe('<CarouselCard />', () => {
  it('should render component properly', () => {
    const imageUri =
      'https://wookie.codesubmit.io/static/posters/d6822b7b-48bb-4b78-ad5e-9ba04c517ec8.jpg';
    const { getByA11yHint } = render(<CarouselCard imageUri={imageUri} />);
    const image = getByA11yHint(hints.cardImage);
    expect(image).toHaveProp('source', { uri: imageUri });
  });
});
