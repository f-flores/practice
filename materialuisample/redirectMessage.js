import React from "react";
import {Link} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';

const RedirectMessage = (props) => {
  const adminAttempt = props.adminAttempt;

  const messageToUser =  (adminAttempt) ? <h2>Admin Privileges Are Required</h2> : <h2>To View This Page</h2>;

  const signupMessage = (adminAttempt) 
    ? null 
    : <MenuItem color="inherit" component={Link} to={"/signup"}>Signup</MenuItem>;

  return (
    <div>  
      <h2>Please Sign Up or Login</h2>
      {messageToUser}

      <div>
          <i className="fas fa-key"></i>
      </div> 

      <MenuItem color="inherit" component={Link} to={"/login"}>Continue to Login</MenuItem>
      {signupMessage}
    </div>
    );
  }

  export default RedirectMessage;