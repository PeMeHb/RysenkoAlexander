import React from 'react';
import PropTypes from 'prop-types';
import './statusMessage.scss';

const ErrorMessage = props => (
  <mark style={{ color: 'red' }}>
    {props.text || 'Error!'}
  </mark>
);
const SuccessMessage = props => (
  <mark style={{ color: 'green' }}>
    {props.text || 'Success!'}
  </mark>
);
export const StatusMessage = (props) => {
  if (props.valid) {
    return <SuccessMessage {...props} />;
  }
  return <ErrorMessage />;
};

StatusMessage.propTypes = {
  text: PropTypes.string
};
