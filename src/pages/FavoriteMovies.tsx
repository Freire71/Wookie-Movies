import React, { useState, useEffect } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import styled from 'styled-components/native';

import { ParamsList } from '../../App';
import { Movie } from '../api/types/movie';
import { useUserContext } from '../providers/UserProvider';
import FavoriteMoviesList from '../components/FavoriteMoviesList';

const SafeAreaView = styled.SafeAreaView`
  background-color: #1c1c26;
  flex: 1;
`;

const Container = styled.View`
  padding-top: 12px;
  flex: 1;
`;

const PageTitle = styled.Text`
  color: #fff;
  font-size: 26px;
  font-family: ${(props) => props.theme.fonts.Barlow_600SemiBold};
  margin-bottom: 12px;
  padding-left: 16px;
`;

interface IProps extends BottomTabScreenProps<ParamsList, 'MoviesSearch'> {}

export const FavoriteMovies = ({ navigation }: IProps) => {
  const { getFavoriteMoviesList, favoriteMoviesMap } = useUserContext();
  const [favoriteMoviesList, setFavoriteMoviesList] = useState<Movie[]>(
    getFavoriteMoviesList()
  );

  useEffect(() => {
    setFavoriteMoviesList(getFavoriteMoviesList());
  }, [favoriteMoviesMap.size]);

  const onMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetails', { movie });
  };

  return (
    <SafeAreaView>
      <Container>
        <PageTitle>My favorite movies</PageTitle>
        <FavoriteMoviesList
          data={favoriteMoviesList}
          onMoviePress={onMoviePress}
        />
      </Container>
    </SafeAreaView>
  );
};

export default FavoriteMovies;
