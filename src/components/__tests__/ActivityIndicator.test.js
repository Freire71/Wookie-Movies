import 'react-native';
import React from 'react';
import { render } from '../../utils/Tests';
import ActivityIndicator from '../ActivityIndicator';

describe('<ActivityIndicator />', () => {
  it('should render component properly', () => {
    const { getByTestId } = render(<ActivityIndicator />);
    const activityIndicatorContainer = getByTestId(
      'activity-indicator-container'
    );

    expect(activityIndicatorContainer).toBeDefined();
  });
});
