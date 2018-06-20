import React from 'react';
import { connect } from 'react-redux';

import { Buttons } from '../buttons';
import { InfoYear } from '../info';
import { ClassToggle } from '../class';

import './info.scss';


export const YearDate = props => (
  <React.Fragment>
    <Buttons update={props.dispatch} />&nbsp;
    <InfoYear date={props.date} />&nbsp;
    <ClassToggle
      update={props.dispatch}
      classInit=""
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  date: state.date,
  classInit: state.className,
});

export const Year = connect(mapStateToProps)(YearDate);
