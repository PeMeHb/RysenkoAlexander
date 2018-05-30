import React from 'react';
import './footer.scss';

const infoText = "Footer text 2017";

export const Footer = () => (
  <footer className="footer">
    <div className="footer__wrapper">
      <span className="footer__info">&copy; {infoText}</span>
    </div>
  </footer>
);
