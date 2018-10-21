// ==========================================================
//
// Navbar component
//
// ==========================================================

import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
// import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import { darken, lighten } from 'material-ui/styles/colorManipulator';
import { compose } from 'recompose';

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

const theme = createMuiTheme({
  overrides: {
    MuiMenuItem: {
      root: {
        color: 'white',
        fontWeight: 'bold',
      },
      selected: {
        color: 'lightgray !important',
        backgroundColor: 'darkblue !important',
      },
    },
  },
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
    // error: red.A400,
  },
});

// safe measure to avoid properties collisions
const Login = props => <Link to="/login" {...props} />
const Home = props => <Link to="/" {...props} />
const About = props => <Link to="/about" {...props} />
const Dashboard = props => <Link to="/dashboard" {...props} />
const Signup = props => <Link to="/signup" {...props} />
const Logout = props => <Link to="/logout" {...props} />
const SDashboard = props => <Link to="/superdashboard" {...props} />
const FDashboard = props => <Link to="/fadmindashboard" {...props} />
const EmpDashboard = props => <Link to="/edashboard" {...props} />


// ---
// functional component that renders Admin nav item if logged in user is an administrator
// ---------------------------------------------------------------------------------------
function SAdminBar(props) {
  const isSuperAdmin = props.isSuperAdmin,
        pathname = props.pathname;

  // console.log(`NavMenu.js SAdminBar props.isAdmin: ${props.isAdmin}`);
  if (isSuperAdmin) {
    return (
    <Toolbar>
      {/* <MenuItem component={Dashboard} selected={"/dashboard" === pathname}>Admin</MenuItem> */}
      <MenuItem component={SDashboard} selected={"/superdashboard" === pathname}>S Dashboard</MenuItem>
    </Toolbar>
    );
  }
  return null;
}

function FAdminBar(props) {
  const isFAdmin = props.isFAdmin,
        pathname = props.pathname;

  // console.log(`NavMenu.js SAdminBar props.isAdmin: ${props.isAdmin}`);
  if (isFAdmin) {
    return (
    <Toolbar>
      {/* <MenuItem component={Dashboard} selected={"/dashboard" === pathname}>Admin</MenuItem> */}
      <MenuItem component={FDashboard} selected={"/fadmindashboard" === pathname}>F Dashboard</MenuItem>
    </Toolbar>
    );
  }
  return null;
}

function EmployeeBar(props) {
  const isEmployee = props.isEmployee,
        pathname = props.pathname;

  // console.log(`NavMenu.js SAdminBar props.isAdmin: ${props.isAdmin}`);
  if (isEmployee) {
    return (
    <Toolbar>
      <MenuItem component={EmpDashboard} selected={"/edashboard" === pathname}>Dashboard</MenuItem>
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
  const isLoggedIn = props.isLoggedIn,
        pathname = props.pathname;
  
  if (isLoggedIn) {
    return (
      <Toolbar> 
        <MenuItem component={Logout} selected={"/logout" === pathname}>Logout</MenuItem>
        <MenuItem><p>{props.email}</p></MenuItem>
      </Toolbar>
    );
  }

  return (
   <Toolbar>
      <MenuItem component={Login} selected={"/login" === pathname}>Login</MenuItem>
      <MenuItem component={Signup} selected={"/signup" === pathname}>Sign Up</MenuItem>
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
    const { classes, location: {pathname} } = this.props;

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
          <MenuItem color="inherit" component={Home} selected={"/" === pathname}>Home</MenuItem>
          <MenuItem color="inherit" component={About} selected={"/about" === pathname}>About</MenuItem>
          { !this.props.isLoggedIn &&
          <MenuItem color="inherit" component={Dashboard} selected={"/dashboard" === pathname}>Dashboard</MenuItem>
          }
          <SAdminBar 
            isSuperAdmin = {this.props.isSuperAdmin} 
            pathname = {pathname}
          />
          <FAdminBar 
            isFAdmin = {this.props.isFAdmin} 
            pathname = {pathname}
          />
          <EmployeeBar 
            isEmployee = {this.props.isEmployee} 
            pathname = {pathname}
          />

          <AuthMenu 
            isLoggedIn = {this.props.isLoggedIn}
            email = {this.props.email}
            pathname = {pathname}
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

export default compose (
  withRouter,
  withStyles(styles)
)(NavMenu);