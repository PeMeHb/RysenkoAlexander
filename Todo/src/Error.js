import React from 'react';

export const Error = props =>
    <mark style={ {color: props.color} }>{props.text || 'Error!'}</mark>;