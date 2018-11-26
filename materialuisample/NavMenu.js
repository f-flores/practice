// ==========================================================
//
// Navbar component
//
// ==========================================================

import React, {Component, Fragment} from "react";
import {Link, withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
// @material-ui icons
// import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
// @material core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header.jsx";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import navbarsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/navbarsStyle.jsx";

import { compose } from 'recompose';
import {AppName} from "../constants/Consts";

// safe measure to avoid properties collisions
const Login = props => <Link to="/login" {...props} />
const Home = props => <Link to="/" {...props} />
const About = props => <Link to="/about" {...props} />
const Dashboard = props => <Link to="/dashboard" {...props} />
const UpdatePassword = props => <Link to="/updatepassword" {...props} />
const Signup = props => <Link to="/signup" {...props} />
const Logout = props => <Link to="/logout" {...props} />
const SDashboard = props => <Link to="/superdashboard" {...props} />
const FDashboard = props => <Link to="/fadmindashboard" {...props} />
const EmpDashboard = props => <Link to="/edashboard" {...props} />
const CustDashboard = props => <Link to="/cdashboard" {...props} />
const MyItems = props => <Link to="/myitems" {...props} />
const RentalItems = props => <Link to="/rentalitems" {...props} />
const PostRental = props => <Link to="/postrental" {...props} />
const ViewRentals = props => <Link to="/viewrentals" {...props} />

// ---
// functional component that renders nav item if logged in user is a super administrator
// ---------------------------------------------------------------------------------------
function SAdminBar(props) {
  const isSuperAdmin = props.isSuperAdmin,
        pathname = props.pathname;

  // console.log(`NavMenu.js SAdminBar props.isAdmin: ${props.isAdmin}`);
  if (isSuperAdmin) {
    return (
    <ListItem
      button
      component={SDashboard}
      selected={"/superdashboard" === pathname}
    >
      S.Dashboard
    </ListItem>
    );
  }
  return null;
}

function FAdminBar(props) {
  const isFAdmin = props.isFAdmin,
        pathname = props.pathname;

  if (isFAdmin) {
    return (
    <ListItem
      button
      component={FDashboard}
      selected={"/fadmindashboard" === pathname}
    >
    A.Dashboard
    </ListItem>
    );
  }
  return null;
}

function EmployeeBar(props) {
  const isEmployee = props.isEmployee,
        pathname = props.pathname;

  if (isEmployee) {
    return (
    <ListItem
      button 
      component={EmpDashboard}
      selected={"/edashboard" === pathname}
    >
      Dashboard
    </ListItem>
    );
  }
  return null;
}

function CustomerBar(props) {
  const isCustomer = props.isCustomer,
        pathname = props.pathname;

  // console.log(`NavMenu.js SAdminBar props.isAdmin: ${props.isAdmin}`);
  if (isCustomer) {
    return (
    <ListItem
      button
      component={CustDashboard}
      selected={"/cdashboard" === pathname}
    >
      My-Info
    </ListItem>
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
        pathname = props.pathname,
        classes = props.classes;
  
  if (isLoggedIn) {
    return (
      <Fragment>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            left
            dropdownHeader="Rentals"
            buttonText="Rentals"
            buttonProps={{
              style: {textTransform: 'capitalize', fontSize: '14px'},
              color: "transparent",
            }}
            dropdownList={[
              <ListItem
                className={`${classes.listItem} ${classes.navLinkActive}`}
                component={MyItems}
                selected={"/myitems" === pathname}
              >
              My Items
              </ListItem>,
              <ListItem
                className={`${classes.listItem} ${classes.navLinkActive}`}
                component={PostRental}
                selected={"/postrental" === pathname}
              >
              Post Rental
              </ListItem>,
              <ListItem
                className={`${classes.listItem} ${classes.navLinkActive}`}
                component={ViewRentals}
                selected={"/viewrentals" === pathname}
              >
              View Rental
              </ListItem>,
              <ListItem
                className={`${classes.listItem} ${classes.navLinkActive}`}
                component={RentalItems}
                selected={"/rentalitems" === pathname}        
              >
                About Rentals
              </ListItem>             
            ]}
          />
        </ListItem>
        <ListItem>
          <span>{props.email}</span>
        </ListItem>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            left
            dropdownHeader="Settings"
            buttonIcon={Settings}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            dropdownList={[
              <ListItem
                className={`${classes.listItem} ${classes.navLinkActive}`}
                component={UpdatePassword}
                selected={"/updatepassword" === pathname}
              >
              Change password
              </ListItem>,              
              "Action 1",
              "Another action",
              { divider: true },
              <ListItem
                className={`${classes.listItem} ${classes.navLinkActive}`}
                component={Logout}
                selected={"/logout" === pathname}
              >
              Logout
              </ListItem>, 
            ]}
          />
        </ListItem>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ListItem
        button 
        component={Login} 
        selected={"/login" === pathname}
      >
        Login
      </ListItem>
      <ListItem
        button
        component={Signup} 
        selected={"/signup" === pathname}
      >
        Signup
      </ListItem>
   </Fragment>
  );
}



class NavMenu extends Component {
  componentWillReceiveProps() {
    // const { location: {pathname}, history } = this.props;
    // history.push(pathname);
  }

  render() {
    const { classes, location: {pathname} } = this.props;

    return  (
      <div className={`cd-section`} id="navigation">
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12}>
            <Header
            brand={AppName}
            color={ (pathname === "/") ? "transparent" : "info"}
            fixed={(pathname === "/") ? true : false}
            changeColorOnScroll={(pathname === "/") 
              ? {
                  height: 300,
                  color: "info",
                } 
              : {
                  height: 0,
                  color: "transparent",
                }
            }
            links={
              <List className={`${classes.list} ${classes.mlAuto}`}>
                <ListItem 
                  button
                  color="transparent"
                  component={Home}
                  selected={"/" === pathname}
                >
                Home
                </ListItem>
                <ListItem 
                  button
                  color="transparent"
                  component={About}
                  selected={"/about" === pathname}
                >
                About
                </ListItem>
                { !this.props.isLoggedIn &&
                  <ListItem 
                    button
                    color="transparent"
                    component={Dashboard}
                    selected={"/dashboard"===pathname}
                  > 
                    Dashboard
                  </ListItem>
                } 

                <SAdminBar
                  isSuperAdmin = {this.props.isSuperAdmin} 
                  pathname = {pathname}
                  classes = {classes}
                />
                <FAdminBar 
                  isFAdmin = {this.props.isFAdmin} 
                  pathname = {pathname}
                  classes = {classes}
                />
                <EmployeeBar 
                  isEmployee = {this.props.isEmployee} 
                  pathname = {pathname}
                  classes = {classes}
                />
                <CustomerBar 
                  isCustomer = {this.props.isCustomer} 
                  pathname = {pathname}
                  classes = {classes}
                />   
                <AuthMenu
                  isLoggedIn = {this.props.isLoggedIn}
                  email = {this.props.email}
                  pathname = {pathname}
                  classes = {classes}
                />
              </List>
            }
          />
          </GridItem>
        </GridContainer>
      </div>
      </div>
    );
  }
}

NavMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose (
  withRouter,
  withStyles(navbarsStyle)
)(NavMenu);

// className={`${classes.listItem} ${classes.navLink} ${classes.navLinkActive}`} 