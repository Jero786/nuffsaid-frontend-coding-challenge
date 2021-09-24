import React from 'react';
import {screen, render} from '@testing-library/react';

import App from "./App";
import {Message} from "./types";

jest.mock('api/subscribe', () => ({
    subscribe: (callback: (msg:Message) => void) => {
        callback({
            priority: 1,
            message: 'Fake message'
        })
        return () => {}; // fake clean-up
    }
}));

describe('app', () => {
    it('should render home page', () => {
        render(<App/>)

        expect(screen.getByText(/nuffsaid.com Coding Challenge/i)).toBeInTheDocument();
        expect(screen.getByText(/stop/i)).toBeInTheDocument();
    });
});