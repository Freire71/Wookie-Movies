import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useRef, useEffect } from 'react';
import LottieAnimation from 'lottie-react-native';
import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { TabsParamList } from '../../App';
import movieAnimation from '../assets/clapperboard.json';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const SplashScreenContainer = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MovieAnimation = styled(LottieAnimation).attrs({
  source: movieAnimation,
  autoPlay: true,
  loop: true,
  speed: 2,
})`
  width: ${responsiveWidth(25)}px;
  height: ${responsiveHeight(40)}px;
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.Barlow_700Bold};
  margin-bottom: 12px;
  color: #fff;
  font-size: ${responsiveFontSize(4)}px;
`;

interface IProps extends BottomTabScreenProps<TabsParamList, 'Home'> {}

const SplashScreen = ({ navigation }: IProps) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }).start();
    navigateToAppHome();
  }, []);

  const navigateToAppHome = () => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'HomeTabs' }],
      });
    }, 2000);
  };

  return (
    <Container>
      <SplashScreenContainer style={{ opacity }}>
        <Title>WOOKIE MOVIES</Title>
        <MovieAnimation />
      </SplashScreenContainer>
    </Container>
  );
};

export default SplashScreen;
