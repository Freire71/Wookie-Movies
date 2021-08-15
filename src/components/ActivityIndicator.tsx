import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const Content = styled.View`
  background-color: #fff;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  width: ${responsiveScreenWidth(20)}px;
  height: ${responsiveScreenHeight(10)}px;
  border: 1px solid grey;
`;

const Spinner = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#2b2c33',
})``;

export const testIDs = {
  container: 'activity-indicator-container',
};

function ActivityIndicator() {
  return (
    <Container testID={testIDs.container}>
      <Content>
        <Spinner />
      </Content>
    </Container>
  );
}

export default ActivityIndicator;
