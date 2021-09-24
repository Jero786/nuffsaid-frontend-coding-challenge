import React, {ReactElement, useEffect, useState, useMemo, useCallback} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {subscribe} from "api/subscribe";
import {Message, Priority, UniqueMessage} from "types/index.d";

type ContextType = Readonly<{
    stopAll: () => void;
    startAll: () => void;
    clear: (messageId: string, priority: Priority) => void;
    clearAll: () => void;
    errorMessages: UniqueMessage[];
    warnMessages: UniqueMessage[];
    infoMessages: UniqueMessage[];
    latestErrorMessage?: Message;
    setLatestErrorMessage: (msg?: Message) => void;
    stopMessages: boolean;
}>;

const MessageContext = React.createContext<ContextType>({
    stopAll: () => {},
    startAll: () => {},
    clear: () => {},
    clearAll: () => {},
    setLatestErrorMessage: () => {},
    errorMessages: [],
    warnMessages: [],
    infoMessages: [],
    stopMessages: false,
});

type Props =  Readonly<{
    children: ReactElement;
}>;

const MessageProvider = ({children}: Props) => {
    const [errorMessages, setErrorMessages] = useState<UniqueMessage[]>([]);
    const [warnMessages, setWarnMessages] = useState<UniqueMessage[]>([]);
    const [infoMessages, setInfoMessages] = useState<UniqueMessage[]>([]);
    const [latestErrorMessage, setLatestErrorMessage] = useState<Message>();
    const [stopMessages, setStopMessages] = useState<boolean>(false);

    const SETTER_MAPPING = useMemo(() => ({
        [Priority.Info]: setInfoMessages,
        [Priority.Error]: setErrorMessages,
        [Priority.Warn]: setWarnMessages,
    }), [setInfoMessages, setErrorMessages, setWarnMessages]);

    const addMessage = useCallback((message: Message) => {
        if (!stopMessages) {
            const newMessage = {...message, uniqueId: uuidv4()}; // adding custom id to avoid re-rendering.
            const setMessage = SETTER_MAPPING[message.priority];
            if (Priority.Error === message.priority) {
                setLatestErrorMessage(message);
            }
            setMessage(prevState => {
                return [newMessage, ...prevState]; // adding at the top of the list.
            });
        }
    }, [stopMessages, SETTER_MAPPING]);

    useEffect(() => {
        return subscribe((message: Message) => {
            addMessage(message);
        });
    }, [addMessage]);

    const clear = useCallback((messageId: string, priority: Priority) => {
        const setMessage = SETTER_MAPPING[priority]
        setMessage(prevState => prevState.filter(msg => msg.message !== messageId));
    }, [SETTER_MAPPING]);

    const clearAll = useCallback(() => {
        setErrorMessages([]);
        setInfoMessages([]);
        setWarnMessages([]);
        setStopMessages(false);
    }, [
        setErrorMessages,
        setInfoMessages,
        setWarnMessages,
        setStopMessages
    ]);

    const stopAll = useCallback(() => setStopMessages(true), [setStopMessages]);
    const startAll = useCallback(() => setStopMessages(false), [setStopMessages]);
    const context = useMemo<ContextType>(() => ({
        stopAll,
        startAll,
        clearAll,
        errorMessages,
        warnMessages,
        infoMessages,
        clear,
        latestErrorMessage,
        setLatestErrorMessage,
        stopMessages,
    }), [
        stopAll,
        startAll,
        clear,
        clearAll,
        errorMessages,
        warnMessages,
        infoMessages,
        latestErrorMessage,
        setLatestErrorMessage,
        stopMessages,
    ]);

    return (
        <MessageContext.Provider value={context}>
            {children}
        </MessageContext.Provider>
    );
}

MessageContext.displayName = 'MessageContext';
MessageProvider.displayName = 'MessageProvider';

export {
    MessageContext,
    MessageProvider,
}