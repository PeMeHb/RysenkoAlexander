import React from 'react';
import './header.scss'

import { Navigation } from "./navigation";

export const Header = () => (
   <header className="header">
       <div className="header__wrapper">
           <a href={"/"} className="header__logo">
               <img src="#" alt="Logo"/>
           </a>
          <Navigation />
       </div>
   </header>
);
