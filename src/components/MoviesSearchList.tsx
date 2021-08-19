import React from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';

import { Movie } from '../api/types/movie';
import { testID } from '../utils/Tests';
import ListMessage from './ListMessage';
import MovieCard from './MovieCard';

interface IMoviesSearchListProps {
  data: Movie[];
  onMoviePress: (movie: Movie) => void;
  failedToFech: boolean;
  isFetching: boolean;
}

const EMPTY_LIST_MESSAGE_TITLE = "Unfortunately we don't have this movie 😢";
const EMPTY_LIST_MESSAGE_SUBTITLE =
  'Try a different movie name or enjoy the movies available on our home page';
const ERROR_MESSAGE = 'Ops... Something went wrong. Please try again later';

const MoviesSearchList = ({
  data,
  onMoviePress,
  failedToFech,
  isFetching,
}: IMoviesSearchListProps) => {
  const keyExtractor = (item: Movie, index: number) => `${item.id}/${index}`;

  const renderItem = ({ item, index }: ListRenderItemInfo<Movie>) => {
    return (
      <View style={[index % 2 == 0 ? { marginRight: 5 } : { marginLeft: 5 }]}>
        <MovieCard
          movie={item}
          onMoviePress={onMoviePress}
          {...testID('movies-search-list-item')}
        />
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
