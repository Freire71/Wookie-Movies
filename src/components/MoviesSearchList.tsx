import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import styled from 'styled-components/native';
import { Movie } from '../api/types/movie';
import MovieCard from './MovieCard';

interface IMoviesSearchListProps {
  data: Movie[];
  onMovieClick: (movie: Movie) => void;
  failedToFech: boolean;
  isFetching: boolean;
}

const ListMessageContainer = styled.View`
  margin-top: 12px;
  padding-horizontal: 12px;
`;
const ListMessageTitle = styled.Text`
  text-align: center;
  color: #fff;
  font-family: ${(props) => props.theme.fonts.Barlow_600SemiBold};
  font-size: 26px;
`;
const ListMessageSubtitle = styled.Text`
  margin-top: 8px;
  text-align: center;
  color: #8a8ea8;
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.Barlow_500Medium};
`;

const ListMessage = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <ListMessageContainer>
      <ListMessageTitle>{title}</ListMessageTitle>
      {subtitle && <ListMessageSubtitle>{subtitle}</ListMessageSubtitle>}
    </ListMessageContainer>
  );
};

const EMPTY_LIST_MESSAGE_TITLE = "Unfortunately we don't have this movie 😢";
const EMPTY_LIST_MESSAGE_SUBTITLE =
  'Try a name from another movie or enjoy the movies available on our home page';
const ERROR_MESSAGE = 'Ops... Something went wrong. Please try again later';

const MoviesSearchList = ({
  data,
  onMovieClick,
  failedToFech,
  isFetching,
}: IMoviesSearchListProps) => {
  const keyExtractor = (item: Movie, index: number) => `${item.id}/${index}`;

  const renderItem = ({ item, index }: ListRenderItemInfo<Movie>) => {
    return (
      <View style={[index % 2 == 0 ? { marginRight: 5 } : { marginLeft: 5 }]}>
        <MovieCard movie={item} onMovieClick={onMovieClick} />
      </View>
    );
  };

  return (
    <FlatList
      ListEmptyComponent={() => {
        if (!isFetching) {
          return (
            <ListMessage
              title={failedToFech ? ERROR_MESSAGE : EMPTY_LIST_MESSAGE_TITLE}
              subtitle={failedToFech ? '' : EMPTY_LIST_MESSAGE_SUBTITLE}
            />
          );
        }
        return <React.Fragment></React.Fragment>;
      }}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center' }}
    />
  );
};

export default MoviesSearchList;
