import React from 'react';

import { Header } from "./header";
import { Main } from "./main";
import { Footer } from "./footer";

import './app.scss'

export const App = (
    <div className='container'>
        <Header />
        <Main />
        <Footer />
    </div>
);
