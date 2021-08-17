import 'react-native';
import React from 'react';
import { render } from '../../utils/Tests';
import ListMessage from '../ListMessage';

describe('<ListMessage />', () => {
  it('should render component properly', () => {
    const { getByText } = render(
      <ListMessage title="title" subtitle="subtitle" />
    );
    const titleText = getByText('title');
    const subtitleTitle = getByText('subtitle');

    expect(titleText).toBeDefined();
    expect(subtitleTitle).toBeDefined();
  });
});
