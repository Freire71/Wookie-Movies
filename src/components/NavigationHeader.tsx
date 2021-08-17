import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { ParamsList } from '../../App';
import { useUserContext } from '../providers/UserProvider';

export interface PageHeaderAction {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

interface INavigationHeaderProps extends NativeStackScreenProps<ParamsList> {
  navigation: any;
  title: string;
}

const SafeAreView = styled.SafeAreaView`
  background-color: ${(props) => props.theme.backgroundColor};
`;
const Title = styled.Text<{ length: number }>`
  text-align: center;
  color: #fff;
  font-family: ${(props) => props.theme.fonts.Barlow_600SemiBold};
  font-size: ${(props) => (props.length > 25 ? 18 : 22)}px;
`;

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 12px;
  padding-top: 12px;
  padding-horizontal: 12px;
`;

const IconBtn = styled.TouchableOpacity``;

const NavigationHeader = ({
  navigation,
  route,
  title,
}: INavigationHeaderProps) => {
  const { getMovieHeaderData, favoriteMoviesMap } = useUserContext();
  const movie = (route.params as any).movie;
  let movieAction;
  let movieHeartColor;
  let movieHeartIcon;

  const { action, heartColor, heartIcon } = getMovieHeaderData(movie.id);
  movieAction = action;
  movieHeartColor = heartColor;
  movieHeartIcon = heartIcon;

  useEffect(() => {
    const { action, heartColor, heartIcon } = getMovieHeaderData(movie.id);
    movieAction = action;
    movieHeartColor = heartColor;
    movieHeartIcon = heartIcon;
  }, [favoriteMoviesMap]);

  return (
    <SafeAreView>
      <Container>
        <IconBtn onPress={() => navigation.goBack()}>
          <Ionicons size={30} name="chevron-back" color="#FFF" />
        </IconBtn>
        <Title length={movie.title.length}>{title}</Title>
        <IconBtn onPress={() => movieAction(movie)}>
          <Ionicons
            size={30}
            name={movieHeartIcon as 'heart' | 'heart-outline'}
            color={movieHeartColor}
          />
        </IconBtn>
      </Container>
    </SafeAreView>
  );
};

export default NavigationHeader;
