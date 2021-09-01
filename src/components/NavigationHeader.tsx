import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { StackParamsList } from '../../App';
import { useUserContext } from '../providers/UserProvider';
import { testID } from '../utils/Tests';
import { NativeStackHeaderProps } from '@react-navigation/native-stack/lib/typescript/src/types';

export interface PageHeaderAction {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

interface INavigationHeaderProps extends NativeStackHeaderProps {
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
  const { movie } = (route as any).params;
  const { getMovieHeaderData, favoriteMoviesMap } = useUserContext();
  const [headerData, setHeaderData] = useState(getMovieHeaderData(movie.id));

  useEffect(() => {
    setHeaderData(getMovieHeaderData(movie.id));
  }, [favoriteMoviesMap.size]);

  const { action, heartColor, heartIcon } = headerData;

  return (
    <SafeAreView>
      <Container>
        <IconBtn
          {...testID('navigation-header-go-back-btn')}
          onPress={() => navigation.goBack()}
        >
          <Ionicons size={30} name="chevron-back" color="#FFF" />
        </IconBtn>
        <Title length={movie.title.length}>{title}</Title>
        <IconBtn
          onPress={() => action(movie)}
          {...testID('navigation-header-heart-icon-btn')}
        >
          <Ionicons
            size={30}
            name={heartIcon as 'heart' | 'heart-outline'}
            color={heartColor}
          />
        </IconBtn>
      </Container>
    </SafeAreView>
  );
};

export default NavigationHeader;
