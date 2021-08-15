import React from 'react';
import styled from 'styled-components/native';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import { testID } from '../utils/Tests';

const InfoBoxContainer = styled.View`
  padding: 16px;
  border: 1.5px solid ${(props) => props.theme.lightGrey};
  width: 125px;
  border-radius: 10px;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

const InfoBoxTypeTitle = styled.Text`
  margin-top: 10px;
  color: #8a8ea8;
  font-family: ${(props) => props.theme.fonts.Barlow_700Bold};
  font-size: 16px;
`;

const InfoBoxValue = styled.Text`
  color: #fff;
  margin-top: 6px;
  font-family: ${(props) => props.theme.fonts.Barlow_600SemiBold};
  text-align: center;
  font-size: 14px;
`;

const InfoBoxIconContainer = styled.View``;

export interface IMovieInfoBox {
  data: any;
  type: 'length' | 'genre' | 'releaseYear' | 'director';
}
const iconSize = 25;
const iconColor = '#FFF';

const MovieInfoBox = ({ data, type }: IMovieInfoBox) => {
  const propertyMap = {
    length: 'Duration',
    genre: 'Genre (s)',
    director: 'Director (s)',
    releaseYear: 'Year',
  };
  const iconNames = {
    length: 'time-slot',
    genre: 'clapperboard',
    releaseYear: 'calendar',
    director: 'user-friends',
  };
  const iconContainerTestID = `movie-info-${type}-icon`;

  const icon = (
    <InfoBoxIconContainer {...testID(iconContainerTestID)}>
      {type === 'director' ? (
        <FontAwesome5
          size={iconSize}
          color={iconColor}
          name={iconNames[type] as any}
        />
      ) : (
        <Entypo
          size={iconSize}
          color={iconColor}
          name={iconNames[type] as any}
        />
      )}
    </InfoBoxIconContainer>
  );
  let dataToShow = data;
  if (type == 'genre' && Array.isArray(data)) {
    dataToShow = data.join(', ');
  }
  if (type == 'director' && Array.isArray(data)) {
    dataToShow = data.join(', ');
  }
  if (type == 'releaseYear') {
    dataToShow = data.split('-')[0];
  }
  return (
    <InfoBoxContainer {...testID(`movie-info-${type}`)}>
      {icon}
      <InfoBoxTypeTitle>{propertyMap[type]}</InfoBoxTypeTitle>
      <InfoBoxValue>{dataToShow}</InfoBoxValue>
    </InfoBoxContainer>
  );
};

export default MovieInfoBox;
