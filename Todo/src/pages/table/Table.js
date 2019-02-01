import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import "react-table/react-table.css";

import { getUsers } from "../../services/userService";
import { getAllUsers, allUsers } from '../../store';


import './table.scss';


export class TableResult extends Component {
  constructor(props) {
    super(props);
  }

    componentDidMount() {
      getUsers()
        .then(this.props.getAllUsers);
    }


  render() {
    const { allUsers } = this.props;

    return (
      allUsers.length > 0
      && (
        <React.Fragment>

          <div>
            <ReactTable
              data={allUsers}
             /* resolveData={data => data.map(row => row)} */
              columns={[
                {
                  Header: 'Name',
                  columns: [
                    {
                      Header: 'First Name',
                      accessor: 'firstName'
                    },
                    {
                      Header: 'Last Name',
                      accessor: 'lastName'
                    }
                  ]
                },
                {
                  Header: 'Total Info',
                  columns: [
                    {
                      Header: 'Wins',
                      id: 'winGames',
                      accessor: u => u.X.winGames + u.O.winGames
                    },
                    {
                      Header: 'Loses',
                      id: 'loseGames',
                      accessor: u => u.X.loseGames + u.O.loseGames
                    },
                    {
                      Header: 'Draws',
                      id: 'drawGames',
                      accessor: u => u.X.drawGames + u.O.drawGames
                    }
                  ]
                },
                {
                  Header: 'X Info',
                  columns: [
                    {
                      Header: 'Wins',
                      accessor: 'X.winGames'
                    },
                    {
                      Header: 'Loses',
                      accessor: 'X.loseGames'
                    },
                    {
                      Header: 'Draws',
                      accessor: 'X.drawGames'
                    }
                  ]
                },
                {
                  Header: 'O Info',
                  columns: [
                    {
                      Header: 'Wins',
                      accessor: 'O.winGames'
                    },
                    {
                      Header: 'Loses',
                      accessor: 'O.loseGames'
                    },
                    {
                      Header: 'Draws',
                      accessor: 'O.drawGames'
                    }
                  ]
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />

          </div>

        </React.Fragment>
      )
    );
  }
}


const mapState = ({ user, allUsers }) => ({
  user,
  allUsers
});

const mapDispatch = {
  getAllUsers
};

export const Table = connect(mapState, mapDispatch)(TableResult);
