import React from 'react';
import './section.scss'

import { Greeting } from "./greeting";
import { Numbers } from "./numbers";

const mainTitleText = "Hello, react easycode";
const greetingName = " Sasha";

export const Section = () => (
    <section className="section">
        <h1 className="section__title">{mainTitleText}</h1>
        <Greeting name={greetingName} />
        <Numbers
            from="3"
            to="7"
            even
        />
    </section>
);
