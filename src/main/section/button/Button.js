import React from 'react';
import './button.scss'

export const Button = ({ className, clickHendler, buttonText }) => {
    return (
        <div className="section__button-box">
            <button className={`section__button ${className}`}
                    onClick={ () => clickHendler() }
            >
                {buttonText}
            </button>
            <p className="section__info-text">Lorem ipsum dolor sit amet.</p>
        </div>
    )
};
