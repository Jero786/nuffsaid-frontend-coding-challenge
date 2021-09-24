import styled from 'styled-components';

import {bp_lg} from "commons/styles/theme";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Content = styled.div`
  max-width: ${bp_lg + 160}px;
  margin: 0 auto;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: yellow;
`;