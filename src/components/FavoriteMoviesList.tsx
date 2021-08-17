import React from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Movie } from '../api/types/movie';
import FavoriteMoviesListItem from './FavoriteMoviesListItem';
import ListMessage from './ListMessage';

interface IFavoriteMoviesListProps {
  data: Movie[];
  onMoviePress: (movie: Movie) => void;
}

export const EMPTY_LIST_MESSAGE_TITLE =
  'You do not have marked any movie as your favorite';
export const EMPTY_LIST_MESSAGE_SUBTITLE =
  'To favorite a movie press the ♡ icon on the movie details page';

const FavoriteMoviesList = ({
  data,
  onMoviePress,
}: IFavoriteMoviesListProps) => {
  const keyExtractor = (item: Movie, index: number) => `${item.id}/${index}`;

  const renderItem = ({ item }: ListRenderItemInfo<Movie>) => {
    return <FavoriteMoviesListItem movie={item} onMoviePress={onMoviePress} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={() => (
        <ListMessage
          title={EMPTY_LIST_MESSAGE_TITLE}
          subtitle={EMPTY_LIST_MESSAGE_SUBTITLE}
        />
      )}
    />
  );
};

export default FavoriteMoviesList;
