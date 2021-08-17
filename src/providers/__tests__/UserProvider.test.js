import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserProvider, useUserContext } from '../UserProvider';

const movie1 = {
  backdrop:
    'https://wookie.codesubmit.io/static/backdrops/d8cbdc3d-c683-4a59-aae3-9a7327f0743a.jpg',
  cast: ['Tommy Lee Jones', 'Javier Bardem', 'Josh Brolin'],
  classification: '18+',
  director: ['Ethan Coen', 'Joel Coen'],
  genres: ['Crime', 'Drama', 'Thriller'],
  id: 'd8cbdc3d-c683-4a59-aae3-9a7327f0743a',
  imdb_rating: 8.1,
  length: '2h 2min',
  overview:
    'Llewelyn Moss stumbles upon dead bodies, $2 million and a hoard of heroin in a Texas desert, but methodical killer Anton Chigurh comes looking for it, with local sheriff Ed Tom Bell hot on his trail. The roles of prey and predator blur as the violent pursuit of money and justice collide.',
  poster:
    'https://wookie.codesubmit.io/static/posters/d8cbdc3d-c683-4a59-aae3-9a7327f0743a.jpg',
  released_on: '2007-11-08T00:00:00',
  slug: 'no-country-for-old-men-2007',
  title: 'No Country for Old Men',
};

const movie1String = JSON.stringify(movie1);

describe('<UserProvider />', () => {
  beforeEach(() => {
    AsyncStorage.getAllKeys = jest.fn(
      () => new Promise((resolve) => resolve([]))
    );
    AsyncStorage.multiGet = jest.fn(
      () => new Promise((resolve) => resolve([]))
    );
    AsyncStorage.removeItem = jest.fn(
      (itemKey) => new Promise((resolve) => resolve())
    );
    AsyncStorage.setItem = jest.fn(
      (itemKey, item) => new Promise((resolve) => resolve())
    );
  });
  it("should return an empty list of favorited movies when there's no favorited movie", async () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUserContext(), { wrapper });
    act(() => {
      result.current.getFavoriteMoviesList();
    });
    expect(result.current.getFavoriteMoviesList().length).toBe(0);
  });

  it('should load favorited movies from async storage', async () => {
    AsyncStorage.getAllKeys = jest.fn(
      () => new Promise((resolve) => resolve([movie1.id]))
    );
    AsyncStorage.multiGet = jest.fn(
      () => new Promise((resolve) => resolve([[movie1.id, movie1String]]))
    );

    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useUserContext(), {
      wrapper,
    });

    result.current.loadUserFavorites();
    await waitForNextUpdate();
    const favoriteMoviesList = result.current.getFavoriteMoviesList();

    expect(favoriteMoviesList.length).toBe(1);
    expect(favoriteMoviesList[0].id).toBe(movie1.id);
  });

  it('should return correct movie header data and trigger correct async storage method when mark a movie as favorite', async () => {
    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result } = renderHook(() => useUserContext(), {
      wrapper,
    });
    const { action, heartColor, heartIcon } = result.current.getMovieHeaderData(
      movie1.id
    );
    act(() => action(movie1));

    expect(heartColor).toBe('#FFF');
    expect(heartIcon).toBe('heart-outline');
    expect(action.name).toBe('addToFavorites');
    expect(AsyncStorage.setItem).toBeCalledWith(movie1.id, movie1String);
    expect(AsyncStorage.removeItem).toBeCalledTimes(0);
  });

  it('should return correct movie header data and trigger correct async storage method when removing a movie from favorite list', async () => {
    AsyncStorage.getAllKeys = jest.fn(
      () => new Promise((resolve) => resolve([movie1.id]))
    );
    AsyncStorage.multiGet = jest.fn(
      () => new Promise((resolve) => resolve([[movie1.id, movie1String]]))
    );

    const wrapper = ({ children }) => <UserProvider>{children}</UserProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useUserContext(), {
      wrapper,
    });
    result.current.loadUserFavorites();
    await waitForNextUpdate();
    const { action, heartColor, heartIcon } = result.current.getMovieHeaderData(
      movie1.id
    );

    act(() => action(movie1));

    expect(heartColor).toBe('#f00');
    expect(heartIcon).toBe('heart');
    expect(action.name).toBe('removeFromFavorites');
    expect(AsyncStorage.removeItem).toBeCalledWith(movie1.id);
    expect(AsyncStorage.setItem).toBeCalledTimes(0);
  });
});
