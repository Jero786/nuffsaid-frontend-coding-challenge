import React, {ReactElement, useContext} from 'react';
import {render, screen} from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks'

import {MessageContext, MessageProvider} from "contexts/message";
import {HomePage} from "./index";
import {Message} from "types/index.d";

jest.mock('api/subscribe', () => ({
    subscribe: (callback: (msg:Message) => void) => {
        callback({
            priority: 1,
            message: 'Fake message'
        })
        return () => {}; // fake clean-up
    }
}));

function renderHomePage() {
    return (
        <MessageProvider>
            <HomePage/>
        </MessageProvider>
    )
}

describe('HomePage', () => {

    it('should render properly a simple message', () => {
        const wrapper = ({children}: {children: ReactElement}) => <MessageProvider>{children}</MessageProvider>;
        renderHook(() => useContext(MessageContext), {
            wrapper,
        })

        render(renderHomePage());

        expect(screen.getByText(/nuffsaid.com Coding Challenge/i)).toBeInTheDocument();
        expect(screen.getByText(/fake message/i)).toBeInTheDocument();
        expect(screen.getByText(/STOP/i)).toBeInTheDocument();
        expect(screen.getAllByText(/CLEAR/i).length).toEqual(2);
    });

    it('should clean all messages properly', () => {
        const wrapper = ({children}: {children: ReactElement}) => <MessageProvider>{children}</MessageProvider>;
        renderHook(() => useContext(MessageContext), {
            wrapper,
        })

        render(renderHomePage());

        expect(screen.getByText(/nuffsaid.com Coding Challenge/i)).toBeInTheDocument();
        expect(screen.getByText(/fake message/i)).toBeInTheDocument();
        expect(screen.getByText(/STOP/i)).toBeInTheDocument();
        expect(screen.getAllByText(/CLEAR/i).length).toEqual(2);

        act(() => {
            screen.getAllByText(/CLEAR/i)[0].click(); // click in first
        });

        expect(screen.getAllByText(/CLEAR/i).length).toEqual(1);
        expect(screen.queryByText(/fake message/i)).not.toBeInTheDocument();
    });

    it('should clean a specific messages properly', () => {
        const wrapper = ({children}: {children: ReactElement}) => <MessageProvider>{children}</MessageProvider>;
        renderHook(() => useContext(MessageContext), {
            wrapper,
        })

        render(renderHomePage());

        expect(screen.getByText(/nuffsaid.com Coding Challenge/i)).toBeInTheDocument();
        expect(screen.getByText(/fake message/i)).toBeInTheDocument();
        expect(screen.getByText(/STOP/i)).toBeInTheDocument();
        expect(screen.getAllByText(/CLEAR/i).length).toEqual(2);

        act(() => {
            screen.getAllByText(/CLEAR/i)[1].click(); // specific message
        });

        expect(screen.getAllByText(/CLEAR/i).length).toEqual(1);
        expect(screen.queryByText(/fake message/i)).not.toBeInTheDocument();
    });

    it('should match snapshot', () => {
        const wrapper = ({children}: {children: ReactElement}) => <MessageProvider>{children}</MessageProvider>;
        renderHook(() => useContext(MessageContext), {
            wrapper,
        })

        render(renderHomePage());

        expect(screen.getByText(/nuffsaid.com Coding Challenge/i)).toBeInTheDocument();
        expect(screen.getByText(/fake message/i)).toBeInTheDocument();
        expect(screen.getByText(/STOP/i)).toBeInTheDocument();
        expect(screen.getAllByText(/CLEAR/i).length).toEqual(2);
    });

});