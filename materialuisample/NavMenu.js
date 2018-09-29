// ==========================================================
//
// Navbar component
//
// ==========================================================

import React, {Component} from "react";
import {Link} from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuList from '@material-ui/core/Menu';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { darken, lighten } from 'material-ui/styles/colorManipulator';

import {AppName} from "../constants/Consts";

const styles = {
  root: {
    flexGrow: 1,
    color: 'pink',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const themeDefault = createMuiTheme();

const primary = blue[500];

const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        color: 'white',
        colorText: 'white !important',
        backgroundColor: 'red !important',
      },
      selected: {
        // Does not work:
        // background: 'red',
        color: 'white',
        // Does not work:
        // backgroundColor: 'red',

        // Works (without the need for !important)
        // background: 'linear-gradient(45deg, red 30%, orange 90%)',

        // Works (must use !important):
        // backgroundColor: 'red !important',

        // Works (must use !important):
        // background: 'red !important',
      },
    },
  },
  palette: {
    primary: { 
      light: blue[300], 
      main: blue[500], 
      dark: blue[700],
      textColor: '#fff',
    },
    secondary: {
      light: lighten(pink.A400, 0.07),
      main: pink.A400,
      dark: darken(pink.A400, 0.07),
      contrastText: themeDefault.palette.getContrastText(pink.A400),
    },
    // error: red.A400,
  },
});

/* safe measure to avoid properties collisions */
const Login = props => <Link to="/login" {...props} />
const Home = props => <Link to="/public" {...props} />
const Public = props => <Link to="/public" {...props} />
const Protected = props => <Link to="/protected" {...props} />
const Signup = props => <Link to="/signup" {...props} />
const Logout = props => <Link to="/logout" {...props} />
const SDashboard = props => <Link to="/superdashboard" {...props} />

// ---
// functional component that renders Admin nav item if logged in user is an administrator
// ---------------------------------------------------------------------------------------
function AdminBar(props) {
  const isAdmin = props.isAdmin;
  console.log(`NavMenu.js AdminBar props.isAdmin: ${props.isAdmin}`);
  if (isAdmin) {
    return (
    <Toolbar>
      <MenuItem component={Protected}>Admin</MenuItem>
      <MenuItem component={SDashboard}>S Dashboard</MenuItem>
    </Toolbar>
    );
  }
  return null;
}

// ---
// functional component that renders Login, Signup, Logout menu Items depending on 
// login state
// ---------------------------------------------------------------------------------------
function AuthMenu(props) {
  const isLoggedIn = props.isLoggedIn;
  
  if (isLoggedIn) {
    return (
      <Toolbar> 
        <MenuItem component={Logout}>Logout</MenuItem>
        <MenuItem><p>{props.email}</p></MenuItem>
      </Toolbar>
    );
  }

  return (
   <Toolbar>
      <MenuItem component={Login}>Login</MenuItem>
      <MenuItem component={Signup}>Sign Up</MenuItem>
   </Toolbar>
  );
}



class NavMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      anchorEl: null,   
    };

  }


  render() {
    const { classes } = this.props;

    return  (
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.grow}>
            {AppName}
          </Typography>
          <MenuItem color="inherit" component={Home} style={{backgroundColor: 'red', color: 'white'}}>Home</MenuItem>
          <MenuItem color="inherit" component={Public}>Public</MenuItem>
          <MenuItem color="inherit" component={Protected}>Protected</MenuItem>
          <AdminBar isAdmin = {this.props.isAdmin || this.props.isSuperAdmin} />
          <AuthMenu 
            isLoggedIn = {this.props.isLoggedIn}
            email = {this.props.email}
          />
        </Toolbar>
      </AppBar>
    </div>
    </MuiThemeProvider>
    );
  }
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavMenu);