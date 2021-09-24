import React from 'react';
import { render, screen } from '@testing-library/react';
import {Header} from "./index";

describe('Header', () => {
    it('should render default', () => {
        render(<Header/>);

        expect(screen.getByText(/nuffsaid.com Coding Challenge/i)).toBeInTheDocument();
    });
});