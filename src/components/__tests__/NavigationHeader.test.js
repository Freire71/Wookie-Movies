import 'react-native';
import React from 'react';
import { render, movies, fireEvent } from '../../utils/Tests';
import NavigationHeader from '../NavigationHeader';
import { useUserContext } from '../../providers/UserProvider';
jest.mock('../../providers/UserProvider', () => ({
  useUserContext: jest.fn(),
}));

describe('<NavigationHeader />', () => {
  let navigation;
  beforeEach(() => {
    navigation = {
      goBack: jest.fn(),
    };
  });
  useUserContext.mockImplementation(() => ({
    getMovieHeaderData: () => ({
      action: jest.fn(),
      heartColor: '#f00',
      heartIcon: 'heart',
    }),
    favoriteMoviesMap: new Map(),
  }));
  it('should render component properly - unfavorited movie', () => {
    const movie = movies[0];
    useUserContext.mockImplementationOnce(() => ({
      getMovieHeaderData: () => ({
        action: jest.fn(),
        heartColor: '#FFF',
        heartIcon: 'heart-outline',
      }),
      favoriteMoviesMap: new Map(),
    }));
    const { getByText, getByTestId } = render(
      <NavigationHeader
        navigation={navigation}
        route={{ params: { movie } }}
        title={movie.title}
      />
    );

    expect(getByText(movie.title)).toBeDefined();
    expect(getByTestId('navigation-header-go-back-btn').children[0]).toHaveProp(
      'name',
      'chevron-back'
    );
    expect(
      getByTestId('navigation-header-heart-icon-btn').children[0]
    ).toHaveProp('name', 'heart-outline');
    expect(
      getByTestId('navigation-header-heart-icon-btn').children[0]
    ).toHaveProp('color', '#FFF');
  });

  it('should render component properly - favorited movie', () => {
    const movie = movies[0];
    useUserContext.mockImplementationOnce(() => ({
      getMovieHeaderData: () => ({
        action: jest.fn(),
        heartColor: '#f00',
        heartIcon: 'heart',
      }),
      favoriteMoviesMap: new Map(),
    }));
    const { getByText, getByTestId } = render(
      <NavigationHeader
        navigation={navigation}
        route={{ params: { movie } }}
        title={movie.title}
      />
    );

    expect(getByText(movie.title)).toBeDefined();
    expect(getByTestId('navigation-header-go-back-btn').children[0]).toHaveProp(
      'name',
      'chevron-back'
    );
    expect(
      getByTestId('navigation-header-heart-icon-btn').children[0]
    ).toHaveProp('name', 'heart');
    expect(
      getByTestId('navigation-header-heart-icon-btn').children[0]
    ).toHaveProp('color', '#f00');
  });
  it('should call navigation go back function when go back icon is pressed', () => {
    const movie = movies[0];
    const { getByTestId } = render(
      <NavigationHeader
        navigation={navigation}
        route={{ params: { movie } }}
        title={movie.title}
      />
    );
    fireEvent(getByTestId('navigation-header-go-back-btn'), 'onPress');
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });
  it('should action provided by useUserContext hook when heart icon is pressed', () => {
    const movie = movies[0];
    const heartIconAction = jest.fn();
    useUserContext.mockImplementationOnce(() => ({
      getMovieHeaderData: () => ({
        action: heartIconAction,
        heartColor: '#f00',
        heartIcon: 'heart',
      }),
      favoriteMoviesMap: new Map(),
    }));
    const { getByTestId } = render(
      <NavigationHeader
        navigation={navigation}
        route={{ params: { movie } }}
        title={movie.title}
      />
    );
    fireEvent(getByTestId('navigation-header-heart-icon-btn'), 'onPress');
    expect(heartIconAction).toHaveBeenCalledTimes(1);
    expect(heartIconAction).toHaveBeenCalledWith(movie);
  });
});
