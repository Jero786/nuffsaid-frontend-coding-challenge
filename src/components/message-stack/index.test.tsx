import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';

import {MessageStack} from './index';
import {MessageCard} from "./message-stack-card";
import {Priority} from "types/index.d";

describe('MessageStack', () => {

    it('should show the title', () => {
        render(<MessageStack priority={Priority.Info} onClick={() => {
        }} title="Error Type 1">
            <div></div>
        </MessageStack>);

        expect(screen.getByText(/Error Type 1/i)).toBeInTheDocument();
    });

    it('should show the label count', () => {
        render(<MessageStack priority={Priority.Info} onClick={() => {
        }} title="xxxxx" labelCount="Count">
            <div></div>
        </MessageStack>);

        expect(screen.getByText(/Count/i)).toBeInTheDocument();
    });

    it('should show the count of children', () => {
        render(
            <MessageStack priority={Priority.Info} onClick={() => {
            }} title="xxxxx">
                <MessageCard title="123"/>
                <MessageCard title="456"/>
            </MessageStack>
        );

        expect(screen.getByText(/Count 2/i)).toBeInTheDocument();
    });

    it('should show each children their text', () => {
        render(
            <MessageStack priority={Priority.Info} onClick={() => {
            }} title="xxxxx">
                <MessageCard title="123"/>
                <MessageCard title="456"/>
            </MessageStack>
        );

        expect(screen.getByText(/123/i)).toBeInTheDocument();
        expect(screen.getByText(/456/i)).toBeInTheDocument();
    });

    it('should be clickable each message card', () => {
        const onClick = jest.fn();
        render(
            <MessageStack priority={Priority.Error} title="xxxxx" onClick={onClick}>
                <MessageCard title="123" type={Priority.Error}/>
            </MessageStack>
        );

        const child = screen.getByText(/Clear/i);

        fireEvent.click(child);

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith("123", Priority.Error);
    });

});