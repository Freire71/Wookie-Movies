import 'react-native';
import React from 'react';
import { render, fireEvent } from '../../utils/Tests';
import MoviesSearchInput from '../MoviesSearchInput';

describe('<ListMessage />', () => {
  it('should render component properly', () => {
    const { getByTestId } = render(
      <MoviesSearchInput isFetching={false} onSearch={jest.fn()} />
    );
    const container = getByTestId('movies-search-input-container');
    const input = getByTestId('movies-search-text-input');

    expect(container).toBeDefined();
    expect(input).toBeDefined();
  });

  it('should render activity indicator while fetching for movies', () => {
    const { getByTestId } = render(
      <MoviesSearchInput isFetching={true} onSearch={jest.fn()} />
    );
    const activityIndicator = getByTestId('movies-search-activity-indicator');
    expect(activityIndicator).toBeDefined();
  });

  it('should call onSearch function with typed value', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <MoviesSearchInput isFetching={false} onSearch={onSearch} />
    );
    const input = getByTestId('movies-search-text-input');
    fireEvent(input, 'onChangeText', 'abc');

    fireEvent(input, 'onEndEditing');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('abc');
  });
  it('should call onSearch function only once with you type repetead values', () => {
    const onSearch = jest.fn();
    const { getByTestId } = render(
      <MoviesSearchInput isFetching={false} onSearch={onSearch} />
    );
    const input = getByTestId('movies-search-text-input');
    fireEvent(input, 'onChangeText', 'abc');
    fireEvent(input, 'onEndEditing');

    fireEvent(input, 'onChangeText', 'abc');
    fireEvent(input, 'onEndEditing');

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith('abc');
  });

  it('should clear text input value when press text clear button', () => {
    const { getByTestId } = render(
      <MoviesSearchInput isFetching={false} onSearch={jest.fn()} />
    );
    const input = getByTestId('movies-search-text-input');
    const clearButton = getByTestId('movies-search-clear-button');

    expect(clearButton).toHaveStyle({ display: 'none' });

    fireEvent(input, 'onChangeText', 'abc');
    fireEvent(input, 'onEndEditing');

    expect(clearButton).toHaveStyle({ display: 'flex' });

    fireEvent(clearButton, 'onPress');

    expect(clearButton).toHaveStyle({ display: 'none' });
    expect(input.props.value).toBe('');
  });
});
