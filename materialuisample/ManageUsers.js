// =====================================================================
//
// Manage Users
// Description: Provides the ability for the superadmin to change a
//  a user's 'userType' from default 'user' to 'admin', 'employee', 
//  'customer' or any other type.
//
// =====================================================================

import React, { Component } from 'react';
import API from '../utils/myAPI';
import PropTypes from 'prop-types';
import ModalUserType from './ModalUserType';

// material-ui dependencies
import { withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { darken, lighten } from 'material-ui/styles/colorManipulator';

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
  },
};

const themeDefault = createMuiTheme();

const theme = createMuiTheme({
  palette: {
    primary: { 
      light: blue[300], 
      main: blue[600], 
      dark: blue[800],
      textColor: '#fff',
    },
    secondary: {
      light: lighten(pink.A400, 0.07),
      main: pink.A400,
      dark: darken(pink.A400, 0.07),
      contrastText: themeDefault.palette.getContrastText(pink.A400),
    },
  },
});

class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: "example",
      userList: [],
      isModalUpdated: false,
    };
  }

  componentDidMount() {
    console.log(`in componentDidMount()`);
    this.getUsers();
  }

  componentDidUpdate() {
    if (this.state.isModalUpdated) {
      this.setState({isModalUpdated: false,});
      this.getUsers();
    }
  }

  // this callback function lets us know whether a user type was changed in
  // the 'ModalUserType' component
  // ========================================================================
  getModalResult = (obj) => this.setState(obj);

  getUsers() {
    API
    .getUsers()
    .then(res => {
      this.setState({userList: res.data,});
    })
    .catch(err => {
      console.log(err);
    })
  }

  // map userList
  render() {
    const { userList } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
      <h3>Manage Users</h3>
      <table>
        <tbody>
        <tr><th>Email</th><th>User Type</th><th>Action</th></tr>
        {userList.map(user =>
          (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>{user.userType}</td>
              <td>
              {user.userType !== "superadmin" &&
                <ModalUserType
                  userId = {user._id}
                  email = {user.email}
                  currentType = {user.userType}
                  sendModalResult = {this.getModalResult}
                />
              }
              </td>
            </tr>
          )
        )}
        </tbody>
      </table>
      </MuiThemeProvider>
    );
  }
}

ManageUsers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ManageUsers);