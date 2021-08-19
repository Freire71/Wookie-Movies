import 'react-native';
import React from 'react';
import { movies, render, fireEvent, waitFor } from '../../utils/Tests';
import Splashscreen from '../Splashscreen';
const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
import { useUserContext } from '../../providers/UserProvider';
jest.mock('../../providers/UserProvider', () => ({
  useUserContext: jest.fn(),
}));

describe('<SplashscreenPage />', () => {
  useUserContext.mockImplementation(() => ({
    loadUserFavorites: jest.fn(),
  }));
  let navigation;
  beforeEach(() => {
    navigation = {
      navigate: jest.fn(),
      reset: jest.fn(),
    };
  });
  it('should render component properly', () => {
    const { getByText } = render(<Splashscreen navigation={navigation} />);
    expect(getByText('Wookie Movies')).toBeDefined();
  });
  it('should call navigation reset function after 2 seconds', async () => {
    render(<Splashscreen navigation={navigation} />);
    await sleep(2000);
    expect(navigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'HomeTabs' }],
    });
  });
});
