import {styled} from '@mui/material/styles';
import MButton from '@mui/material/Button';

import {info, black} from "commons/styles/theme";

const Button = styled(MButton)(() => ({
    color: black,
    backgroundColor: info,
    '&:hover': {
        backgroundColor: info,
    },
}));

Button.displayName = 'Button';

export {
    Button
};