// =====================================================================
//
// Manage Franchise
// Description: Provides the ability for an admin (essentially a franchise
//  owner) to change a user's 'userType' from default 'user' to 'employee', 
//  'customer' or any other type.
//
// =====================================================================

import React, { Component } from 'react';
import API from '../../utils/myAPI';
import PropTypes from 'prop-types';
import EnhancedFranchiseUsersTable from './EnhancedFranchiseUsersTable';
import AddStaffDialog from './AddStaffDialog';

// material-ui dependencies
import { withStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { darken, lighten } from 'material-ui/styles/colorManipulator';
import Add from "@material-ui/icons/Add";

// material-ui pro components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

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

const styles = {
  root: {
    flexGrow: 1,
    width: '100%',
  },
  container: {
    display: 'grid',
    gridGap: `${theme.spacing.unit * 2}px`,
  },
  vSpace: {
    marginBottom: `${theme.spacing.unit * 4}px`,
  },
  hInDisplay: {
    display: "inline-block",
  },
  padText: {
    paddingLeft: `${theme.spacing.unit *1}px`,
  },
};


class FranchiseManage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doesFranchiseExist: false,
      members: [],
      isModalUpdated: false,
      addedUser: false,
      removedUser: false,
    };
  }

  componentDidMount() {
    this.checkIfFranchiseExists();
  }

  componentDidUpdate() {
    const {franchiseId} = this.props;
    if (this.state.isModalUpdated) {
      this.setState({isModalUpdated: false,});
      // this.checkIfFranchiseExists();
      this.getFranchiseMembers(franchiseId);
    }
    if (this.state.addedUser) {
      this.setState({addedUser: false});
      this.getFranchiseMembers(franchiseId);
    }
    if (this.state.removedUser) {
      this.setState({removedUser: false});
      this.getFranchiseMembers(franchiseId);
    }
  }

  // this callback function lets us know whether a user type was changed in
  // the 'ModalUserType' component
  // ========================================================================
  getModalResult = (obj) => this.setState(obj);

  // this callback function lets us know whether staff member was added in
  // the 'AddStaffDialog' component
  // ========================================================================
  getStaffUpdate = (obj) => this.setState(obj);

  // this callback function lets us know whether staff member was removed
  // in the 'RemoveStaffDialog' component
  // ========================================================================
  getStaffRemoveResult = (obj) => this.setState(obj);

  checkIfFranchiseExists() {
    // check admin user's franchise status , find out if one exists.
    const {franchiseId} = this.props;
    if (franchiseId !== "") {
      this.setState({doesFranchiseExist: true});
      this.getFranchiseMembers(franchiseId);   
    } 
  }


  getFranchiseMembers(id) {
    API
    .getMembers(id)
    .then(res => this.setState({members: res.data.members}))
    .catch(err => console.log(err))
  }

  // map members
  render() {
    const { classes, franchiseId } = this.props;
    const { members, doesFranchiseExist } = this.state;

    if (!doesFranchiseExist) {
      return (
        <div>
          <h3>Please create business information first by going to 'Business Info' tab.</h3>
        </div>
      );      
    }
    return (
      <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={12}>

        {/* top row */}
        <GridItem xs={12}>
          <GridItem className={classes.hInDisplay} xs={12} sm={8}>
            <h2>Manage Staff</h2>
          </GridItem>
          <GridItem className={classes.hInDisplay} xs={12} sm={4}>
            <AddStaffDialog 
              staffUpdate={this.getStaffUpdate}
              franchiseId={franchiseId} 
            />
          </GridItem>
        </GridItem>

        {/* table */}
        <GridItem xs={12} className={classes.vSpace}>
          <EnhancedFranchiseUsersTable 
            rowData={members}
            receiveModalResult = {this.getModalResult}
            staffRemoveResult = {this.getStaffRemoveResult}
            franchiseId={franchiseId}
          />
        </GridItem> 
      </GridItem>
      </GridContainer>
    );
  }
}

FranchiseManage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FranchiseManage);