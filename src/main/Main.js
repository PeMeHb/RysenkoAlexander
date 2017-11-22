import React from 'react';
import './main.scss'

import { Aside } from "./aside";
import { Section } from "./section";

export const Main = () => (
    <main className="main">
        <div className="main__wrapper">
            <Aside />
            <Section />
        </div>
    </main>
);
