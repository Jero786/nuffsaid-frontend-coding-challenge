import React from 'react';
import {render, screen} from "@testing-library/react";

import {MessageCard} from "./index";
import {Priority} from "types/index.d";

describe('MessajeCard', () => {

    it('should display a Error Message Card', () => {
        render(<MessageCard type={Priority.Error} title="123"/>);

        expect(screen.getByText(/123/i)).toHaveStyle('background-color: rgb(245, 98, 54)')
    });

    it('should display a Info Message Card', () => {
        render(<MessageCard type={Priority.Info} title="123"/>);

        expect(screen.getByText(/123/i)).toHaveStyle('background-color: rgb(136, 252, 163)')
    });

    it('should display a Warn Message Card', () => {
        render(<MessageCard type={Priority.Warn} title="123"/>);

        expect(screen.getByText(/123/i)).toHaveStyle('background-color: rgb(252, 231, 136)')
    });

    it('should be configurable clear label', () => {
        render(<MessageCard title="123" labelClear="Limpiar"/>);

        expect(screen.getByText(/Limpiar/i)).toBeInTheDocument();
    });
})