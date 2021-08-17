import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';
import { testID } from '../utils/Tests';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const Content = styled.View`
  background-color: #fff;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  width: ${responsiveScreenWidth(20)}px;
  height: ${responsiveScreenWidth(17.5)}px;
  border: 1.5px solid lightcyan;
`;

const Spinner = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#2b2c33',
})``;

function ActivityIndicator() {
  return (
    <Container {...testID('activity-indicator-container')}>
      <Content>
        <Spinner />
      </Content>
    </Container>
  );
}

export default ActivityIndicator;
