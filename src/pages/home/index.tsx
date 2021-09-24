import React, {memo, useContext} from 'react';
import {Stack} from "@mui/material";
import Box from '@mui/material/Box';
import Snackbar from "@mui/material/Snackbar";

import {ActionButtons, Content, Main} from "./styles";
import {Header} from "components/header";
import {MessageStackList} from "components/message-stack";
import {MessageContext} from "contexts/message";
import {Message, Priority} from "types/index.d";
import {Button} from "components/button";

export const HomePage = memo(() => {
    const {
        clear,
        clearAll,
        stopAll,
        startAll,
        stopMessages,
        warnMessages,
        infoMessages,
        errorMessages,
        latestErrorMessage,
        setLatestErrorMessage,
    } = useContext(MessageContext)
    return (
        <Main>
            <Header/>
            {getSnackbar(setLatestErrorMessage, latestErrorMessage)}
            <Content>
                {getActionButtons(stopMessages, startAll, stopAll, clearAll)}
                <Stack direction={{xs: 'column', sm: 'row'}}>
                    <MessageStackList
                        priority={Priority.Error}
                        title='Error Type 1'
                        messages={errorMessages}
                        handlerClearMessage={clear}
                    />
                    <MessageStackList
                        priority={Priority.Warn}
                        title='Warning Type 2'
                        messages={warnMessages}
                        handlerClearMessage={clear}
                    />
                    <MessageStackList
                        priority={Priority.Info}
                        title='Info Type 3'
                        messages={infoMessages}
                        handlerClearMessage={clear}
                    />
                </Stack>
            </Content>
        </Main>
    )
});

function getActionButtons(
   stopMessages: boolean,
   startAll: () => void,
   stopAll: () => void,
   clearAll: () => void,
): JSX.Element {
    return <ActionButtons>
        <Box sx={{'& button': {mt: .8, mr: .3}}}>
            {stopMessages &&
            <Button style={{padding: '5px 18px'}} variant="contained" onClick={startAll}>START</Button>}
            {!stopMessages && <Button style={{padding: '5px 18px'}} variant="contained" onClick={stopAll}>STOP</Button>}
        </Box>
        <Box sx={{'& button': {mt: .8, ml: .2}}}>
            <Button style={{padding: '5px 18px'}} variant="contained" onClick={clearAll}>CLEAR</Button>
        </Box>
    </ActionButtons>;
}

function getSnackbar(
    setLatestErrorMessage: (msg?: Message) => void,
    latestErrorMessage?: Message,
): JSX.Element {
    return <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        open={!!latestErrorMessage}
        autoHideDuration={2000}
        onClose={() => setLatestErrorMessage(undefined)}
        message={latestErrorMessage?.message}
        action={<Button
            onClick={() => setLatestErrorMessage(undefined)}
            color="secondary"
            size="small"
        >Close</Button>}
    />;
}

HomePage.displayName = 'HomePage';

export default HomePage;