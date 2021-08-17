import React from 'react';
import styled from 'styled-components/native';

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

export default ListMessage;
