import React from 'react';
import { View, Text, Platform } from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';

const Image = styled.Image`
  width: ${responsiveWidth(45)}px;
  height: ${responsiveHeight(35)}px;
  resize-mode: contain;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Container = styled.TouchableOpacity`
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 1.41px;
  elevation: 2;
`;

export const hints = {
  cardImage: 'When clicked, you will navigate to movie page',
};

interface ICarouselCardProps {
  imageUri: string;
}

export const CarouselCard = ({ imageUri }: ICarouselCardProps) => {
  return (
    <Container>
      <Image
        accessibilityHint={hints.cardImage}
        source={{
          uri: imageUri,
        }}
      />
    </Container>
  );
};

export default CarouselCard;
