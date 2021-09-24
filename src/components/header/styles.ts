import styled from 'styled-components';
import {gray, lightGray} from "commons/styles/theme";

const HeaderStyle = styled.header`
  display: flex;
  width: 100%;
  border-bottom: solid 1px ${gray};
  margin: 0;
  padding-bottom: 7px;
  box-shadow: 0 1px 1px ${lightGray};
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 100;
  margin: 0;
`;

HeaderStyle.displayName = 'HeaderStyle';
Title.displayName = 'Title';

export {
    HeaderStyle,
    Title,
}
