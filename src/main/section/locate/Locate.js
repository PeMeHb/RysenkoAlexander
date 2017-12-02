import React from 'react';
import './locate.scss'

export const Locate = ({clickHendler, latitude, longitude }) => {
    return (
        <div className="section__locate-box">
            <button className="section__button"
                    onClick={ () => clickHendler() }
            >
                {"Show location"}
            </button>
            <span className="section__locate-text">{`Latitude: ${latitude}`}</span>
            <span className="section__locate-text">{`Longitude: ${longitude}`}</span>
        </div>
    )
};
