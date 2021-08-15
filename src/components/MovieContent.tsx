import React from 'react';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';
import { testID } from '../utils/Tests';

export interface IMovieContentProps {
  cast: string[];
  synopse: string;
}

const SectionTitle = styled.Text`
  margin-top: 8px;
  margin-bottom: 4px;
  font-family: ${(props) => props.theme.fonts.Barlow_600SemiBold};
  color: #fff;
  font-size: ${responsiveWidth(6)}px;
`;
const SectionContent = styled.Text`
  font-family: ${(props) => props.theme.fonts.Barlow_500Medium};
  color: #8a8ea8;
  font-size: ${responsiveWidth(4.2)}px;
`;

const MovieContent = ({ cast, synopse }: IMovieContentProps) => {
  return (
    <>
      <SectionTitle>Cast</SectionTitle>
      <SectionContent {...testID('movie-cast')}>
        {cast.join(', ')}
      </SectionContent>
      <SectionTitle>Synopse</SectionTitle>
      <SectionContent {...testID('movie-synopse')}>{synopse}</SectionContent>
    </>
  );
};

export default MovieContent;
