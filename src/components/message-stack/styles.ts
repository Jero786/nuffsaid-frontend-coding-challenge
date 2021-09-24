import styled from "styled-components";
import {bp_sm} from "../../commons/styles/theme";

const Style = styled.div`
    padding-left: 0;
    width: 100%;
    @media (min-width: ${bp_sm}px) {
        width: 33%;
        padding-left: 1em;
    }
`;

const Title = styled.h2`
    margin-top: 2.8em;
    margin-bottom: 0;
`;

const Subtitle = styled.h4`
    margin: 0;
    font-weight: 200;
`

Style.displayName = 'Style';
Title.displayName = 'Title';
Subtitle.displayName = 'Subtitle';

export {
    Style,
    Subtitle,
    Title
}