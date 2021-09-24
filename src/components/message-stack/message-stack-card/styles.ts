import styled from "styled-components";

import {Priority} from "types/index.d";
import {error, info, warning} from "commons/styles/theme";

const COLOR_MAPPING: {[key: number]: string} = {
    [Priority.Error]: error,
    [Priority.Warn]: warning,
    [Priority.Info]: info,
}

type CardStyle = {
    type: Priority
}

const CardContainer = styled.div<CardStyle>`
    margin-top: .6em;
    position: relative;
`

const cardStyle = (type: Priority) => ({
    display: 'flex',
    backgroundColor: `${COLOR_MAPPING[type]}`,
    paddingRight:  '3em',
    paddingBottom: '2.7em',
});

const ButtonContainer = styled.div`
    position: absolute;
    bottom: .5em;
    right: .3em;
    font-weight: 100;
`

CardContainer.displayName = 'CardContainer';
ButtonContainer.displayName = 'ButtonContainer';

export {
    CardContainer,
    cardStyle,
    ButtonContainer,
}
