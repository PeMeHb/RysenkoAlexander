
import ReactDom from 'react-dom';

import { App } from './app.component';


/*import { Date } from "./date";*/

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



ReactDom.render(App, document.getElementById('app'));
