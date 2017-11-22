import React from 'react';
import './navigation.scss'

const items = ['Home', 'Gallery', 'Contacts'];

export const Navigation = () => (
        <nav className="header__nav">
            <ul className="header__nav-list">
                {   items.map((item, index) => (
                    <li key={index} className="header__nav-item">
                        <a href={`/${item.toLocaleLowerCase()}`} className="header__nav-link">{item}</a>
                    </li>
                ))
                }
            </ul>
        </nav>
);
