import React from 'react';
import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import MovieInfoCarousel from '../components/MovieInfoCarousel';
import MovieStars from '../components/MovieStars';
import MovieContent from '../components/MovieContent';
import { Movie } from '../api/types/movie';
import { ParamsList } from '../../App';

const Container = styled.ScrollView`
  padding: 16px;
  margin-top: ${responsiveWidth(25)}px;
`;

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Image = styled.Image`
  resize-mode: contain;
  width: ${responsiveWidth(35)}px;
  height: ${responsiveWidth(60)}px;
  overflow: hidden;
  left: ${responsiveWidth(8)}px;
  top: ${responsiveWidth(40)}px;
`;

const MovieTitle = styled.Text<{ fontSize: number }>`
  color: #fff;
  font-family: ${(props) => props.theme.fonts.Barlow_500Medium};
  font-size: ${(props) => props.fontSize}px;
  text-shadow: 3px 3px 10px black;
  padding-right: ${responsiveWidth(2)}px;
  left: ${responsiveWidth(46)}px;
  bottom: ${responsiveWidth(6)}px;
  width: ${responsiveWidth(50)}px;
`;

const Divider = styled.View`
  margin-top: 12px;
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.lightGrey};
`;

const MovieBackdrop = styled.ImageBackground`
  width: 100%;
  height: ${responsiveWidth(75)}px;
`;

const StarsContainer = styled.View`
  left: ${responsiveWidth(46)}px;
  top: ${responsiveWidth(14)}px;
  width: ${responsiveWidth(50)}px;
  flex-direction: row;
`;
interface IMovieDetailsProps
  extends NativeStackScreenProps<ParamsList, 'MovieDetails'> {}

export const MovieDetails = ({ route }: IMovieDetailsProps) => {
  const { movie }: { movie: Movie } = route.params;
  const movieTitleWithRating = `${movie.title} (${movie.imdb_rating.toFixed(
    1
  )})`;
  let titleFontSize = responsiveWidth(6);
  if (movieTitleWithRating.length > 40) {
    titleFontSize = responsiveWidth(4.5);
  } else if (movieTitleWithRating.length > 35) {
    titleFontSize = responsiveWidth(5);
  }
  return (
    <ScrollView style={{ backgroundColor: '#1c1c26' }}>
      <SafeAreaView>
        <MovieBackdrop source={{ uri: movie.backdrop }} />
        <View style={{ position: 'absolute' }}>
          <Image source={{ uri: movie.poster }} />
          <View>
            <MovieTitle fontSize={titleFontSize}>
              {movieTitleWithRating}
            </MovieTitle>
            <StarsContainer>
              <MovieStars imdbRating={movie.imdb_rating} />
            </StarsContainer>
          </View>
        </View>
        <Container>
          <MovieInfoCarousel
            director={movie.director}
            releaseYear={movie.released_on}
            genre={movie.genres}
            length={movie.length}
          />
          <Divider />
          <MovieContent cast={movie.cast} synopse={movie.overview} />
        </Container>
      </SafeAreaView>
    </ScrollView>
  );
};

export default MovieDetails;
