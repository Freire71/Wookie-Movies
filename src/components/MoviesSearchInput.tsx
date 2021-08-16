import React, { useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface IMoviesSearchInputProps {
  onSearch: (value: string) => void;
  isFetching: boolean;
}
const TextInput = styled.TextInput`
  padding: 10px;
  flex: 4;
  color: #fff;
  font-family: ${(props) => props.theme.fonts.Barlow_500Medium};
  font-size: 16px;
`;

const androidInputTopMargin = Platform.OS === 'android' ? 12 : 0;

const MoviesSearchInputContainer = styled.View`
  margin-top: ${androidInputTopMargin}px;
  background-color: ${(props) => props.theme.lightGrey};
  width: 90%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  align-self: center;
  border-radius: 24px;
  padding: 12px;
  margin-bottom: 12px;
`;

const ClearButton = styled.TouchableOpacity`
  margin-right: 12px;
`;

const ActivityIndicator = styled.ActivityIndicator``;

const MoviesSearchInput = ({
  onSearch,
  isFetching,
}: IMoviesSearchInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [lastInputedValue, setLastInputedValue] = useState('');
  const showClearButton = inputValue.length > 0 ? 'flex' : 'none';
  const onEndEditing = () => {
    if (inputValue == lastInputedValue || inputValue.length === 0) {
      return;
    }
    setLastInputedValue(inputValue);
    onSearch(inputValue);
  };
  return (
    <MoviesSearchInputContainer>
      <Ionicons size={22} color="#FFF" name="search" />
      <TextInput
        placeholderTextColor="#8a8ea8"
        placeholder="Search for your favorite movie here 😊"
        value={inputValue}
        autoFocus
        onChangeText={setInputValue}
        onEndEditing={onEndEditing}
        numberOfLines={1}
        multiline={false}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={50}
      />
      {isFetching ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <ClearButton
          style={{ display: showClearButton }}
          onPress={() => setInputValue('')}
        >
          <MaterialIcons size={22} color="#FFF" name="cancel" />
        </ClearButton>
      )}
    </MoviesSearchInputContainer>
  );
};

export default MoviesSearchInput;
