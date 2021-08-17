import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Movie } from '../api/types/movie';

interface IUserProvider {
  getMovieHeaderData: (id: string) => {
    action: (movie: Movie) => void;
    heartIcon: string;
    heartColor: string;
  };
  favoriteMoviesMap: Map<string, Movie>;
  getFavoriteMoviesList: () => Movie[];
}

const UserContext = React.createContext<IUserProvider | null>(null);

const UserProvider = ({ children }: { children: React.ReactChild }) => {
  const [favoriteMoviesMap, setFavoriteMoviesMap] = useState(new Map());

  useEffect(() => {
    const mountUserFavorites = async () => {
      const allFavoritedMoviesKeys = await AsyncStorage.getAllKeys();
      if (allFavoritedMoviesKeys.length > 0) {
        const moviesKeyAndValueArray = await AsyncStorage.multiGet(
          allFavoritedMoviesKeys
        );
        const userFavoritesMovies = new Map();
        moviesKeyAndValueArray.forEach((movieKeyAndValue) => {
          const movie = JSON.parse(movieKeyAndValue[1]);
          userFavoritesMovies.set(movieKeyAndValue[0], movie);
        });
        setFavoriteMoviesMap(userFavoritesMovies);
      }
    };
    mountUserFavorites();
  }, []);

  const addToFavorites = (movie: Movie) => {
    setFavoriteMoviesMap(new Map([...favoriteMoviesMap, [movie.id, movie]]));
    AsyncStorage.setItem(movie.id, JSON.stringify(movie));
  };

  const removeFromFavorites = (movie: Movie) => {
    favoriteMoviesMap.delete(movie.id);
    setFavoriteMoviesMap((prevState) => {
      const newMap = new Map(prevState);
      newMap.delete(movie.id);
      return newMap;
    });
    AsyncStorage.removeItem(movie.id);
  };

  const isMovieFavorite = (id: string) => {
    return favoriteMoviesMap.has(id);
  };

  const getMovieHeaderData = (id: string) => {
    const isFavorite = isMovieFavorite(id);
    const action = isFavorite ? removeFromFavorites : addToFavorites;
    const heartColor = isFavorite ? '#f00' : '#FFF';
    const heartIcon = isFavorite ? 'heart' : 'heart-outline';
    return {
      action,
      heartColor,
      heartIcon,
    };
  };

  const getFavoriteMoviesList = () => {
    return [...favoriteMoviesMap.values()];
  };

  return (
    <UserContext.Provider
      value={{
        getFavoriteMoviesList,
        getMovieHeaderData,
        favoriteMoviesMap,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const value = useContext(UserContext);
  if (value == null) {
    throw new Error(
      'userContext() was instantiated  outside of a UserContextProvider'
    );
  }
  return value;
};

export { useUserContext, UserProvider };
