// =======================================================================
//
// File name: EmailForgotPassword.js
// Date: November, 2018
// Description: Presents a form, in which user must enter his or her
//  email in order to receive instructions on how to reset
//  password.
//
// =======================================================================

import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AUTH from './../../utils/AUTH';

// @material-ui core compoenents
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui icons
import Email from "@material-ui/icons/Email";
// material-ui pro components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  errorText: {
    fontSize: '80%',
    color: '#00ff00 !important',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    padding: '2px',
  },
  successText: {
    fontSize: '80%',
    color: 'black !important',
    backgroundColor: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});


class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eMsg: "",
      userEmail: "",
      validEmail: false,
      redirect: false,
      success: false,
    }
  }

  componentWillUnmount() {
    clearTimeout(this.redirTimeout);
  }

  handleOnChange = event => {
    // console.log(`handleOnChange`);
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const {userEmail} = this.state;
    AUTH
    .forgotPassword({email: userEmail})
    .then(() => {
      this.setState({
        success: true,
        eMsg: "",
      });
    })
    .catch(err => {
      const errMsg = err.response.statusText;
      this.setState({
        success: false,
        eMsg: errMsg,
      });
    })
  }

  validatorListenerEmail = result => this.setState({validEmail: result});

  render() {
    const {classes} = this.props;
    const {eMsg, success, userEmail, validEmail, redirect} = this.state;

    if (redirect) {
      return (
        <Redirect to='/' />
      );
    }

    if (success) {
      this.redirTimeout = setTimeout(() => {
          this.setState({redirect: true})
        }, 2000);
      return (
        <GridItem xs={12} sm={9}>
          <TextField
            className={classes.errorText} 
            variant="outlined" 
            fullWidth
            value={`Email sent to ${userEmail} successfully!. Will direct to home page.`}
          />
        </GridItem>
      );
    }

    return (
    <ValidatorForm 
      onSubmit={this.handleSubmit}
      className={classes.form}
    >

    <GridContainer justify="center" spacing={24}>
      <GridItem xs={12} sm={7}>
        <Typography variant="h4" gutterBottom>
        Forgot Password
        </Typography>
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextValidator
          autoFocus
          id="user-email"
          name="userEmail"
          label="Email"
          autoComplete="femail"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.customFormControlClasses}>
                <Email className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            placeholder: "Enter email ..."
          }}
          validators={['required',`isEmail`]}
          errorMessages={['this field is required', `Enter valid email.`]}
          validatorListener={this.validatorListenerEmail}
          value={userEmail}
          onChange={this.handleOnChange}
        />
      </GridItem>
      <GridItem xs={12} sm={7}>
        <Button type="submit" color="primary" disabled={!validEmail || success}>
          Send Email
        </Button>
      </GridItem>
      <GridItem xs={12} sm={7}>
      {
        eMsg !== ""
        ? <TextField
            fullWidth
            variant="outlined"
            className={classes.errorText}
            value = {`Message not sent: ${eMsg}.`}
          />
        : null
      }
      </GridItem>
    </GridContainer>
  </ValidatorForm>
  );

  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotPassword);