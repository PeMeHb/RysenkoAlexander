import React from 'react';
import './navigation.scss'

export const Navigation = () => {
    const text = 'Home';
    return (
        <nav className='main-nav'>
            <ul>
                <li><a href={"#"}>{text}</a></li>
                <li><a href={"#"}>Gallery</a></li>
            </ul>
        </nav>
    );
};
