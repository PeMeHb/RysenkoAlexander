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

  setAllUsers = () => {
    const { allUsers } = this.props;
    console.log(allUsers);
    /*    users.forEach((user) => {
          delete user.sid;
          delete user.password;
          console.log(user)
        });*/
  };

  render() {
    const { allUsers } = this.props;

/*    console.log(allUsers.forEach((user) => {
      console.log(user.firstName)
    }));*/


    return (

      allUsers
      && (
        <React.Fragment>

          <div>
            <ReactTable
              data={allUsers}
              columns={[
                {
                  Header: "Name",
                  columns: [
                    {
                      Header: "First Name",
                      accessor: "firstName"
                    },
                    {
                      Header: "Last Name",
                      accessor: "lastName"
                    }
                  ]
                },
                {
                  Header: "Total Info",
                  columns: [
                    {
                      Header: "Wins",
                      id: "winGames",
                      accessor: u => u['X'].winGames + u['0'].winGames
                    },
                    {
                      Header: "Loses",
                      id: "loseGames",
                      accessor: u => u['X'].loseGames + u['0'].loseGames
                    },
                    {
                      Header: "Draws",
                      id: "drawGames",
                      accessor: u => u['X'].drawGames + u['0'].drawGames
                    }
                  ]
                },
                {
                  Header: "X Info",
                  columns: [
                    {
                      Header: "Wins",
                      id: "winGames",
                      accessor: u => u['X'].winGames
                    },
                    {
                      Header: "Loses",
                      id: "loseGames",
                      accessor: u => u['X'].loseGames
                    },
                    {
                      Header: "Draws",
                      id: "drawGames",
                      accessor: u => u['X'].drawGames
                    }
                  ]
                },
                {
                  Header: "0 Info",
                  columns: [
                    {
                      Header: "Wins",
                      id: "winGames",
                      accessor: u => u['0'].winGames
                    },
                    {
                      Header: "Loses",
                      id: "loseGames",
                      accessor: u => u['0'].loseGames
                    },
                    {
                      Header: "Draws",
                      id: "drawGames",
                      accessor: u => u['0'].drawGames
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
