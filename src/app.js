
import React from 'react';
import ReactDom from 'react-dom';

import { Navigation } from "./Navigation";

/*const paint = () => {
    const time = React.createElement('time', null, ` Time is ${new Date().toLocaleTimeString()}`);
/!*    const component = React.createElement('h1', null, 'Hello, react easycode!', time);*!/
    const component = <h1>Hello, react easycode {time}</h1>;
    ReactDom.render(component, document.getElementById('app'));
};

setInterval(paint, 1000);*/

/*
const Navigation = () => (
    <nav>
        <ul>
            <li>Home</li>
            <li>Gallery</li>
        </ul>
    </nav>
);
*/

const Component = (
    <div>
    <h1>Hello, react easycode</h1>
    <Navigation />
    </div>
);

ReactDom.render(Component, document.getElementById('app'));
