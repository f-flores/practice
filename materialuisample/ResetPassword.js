// ==============================================================================
//
// File name: ResetPassword.js
// Date: November, 2018
// Description: This component is a user interface that allows the user to reset
//  password. This component is 'linked to' from an email that contains a reset
//  token id.
//
// ===============================================================================

import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
// import CustomerControls from './CustomerControls';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import AUTH from '../../utils/AUTH';
import {MinPasswordLength, MaxPasswordLength} from '../../constants/Consts';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// @material-ui core compoenents
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
// @material-ui icons
import VpnKey from "@material-ui/icons/VpnKey";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
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
  container: {
    display: 'grid',
    gridGap: `${theme.spacing.unit * 2}px`,
  },
  vSpace: {
    marginBottom: `${theme.spacing.unit * 4}px`,
  },
  hSpace: {
    width: '50%',
    marginLeft: `${theme.spacing.unit * 3}px`,
  },
  hInDisplay: {
    display: "inline-block",
  },
  errorText: {
    // marginLeft: `${theme.spacing.unit * 10}px`,
    // width: '75%',
    fontSize: '110%',
    color: '#00ff00 !important',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    padding: '5px',
  },
  successText: {
    fontSize: '110',
    color: 'black !important',
    backgroundColor: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});


class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      submitError: false,
      goodNew: false,
      goodConfirm: false,
    }
  }

  // custom validation rule
  // https://www.npmjs.com/package/react-material-ui-form-validator
  // =================================================================
  componentDidMount() {
    const {newPassword} = this.state;
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.newPassword) {
          return false;
      }
      return true;
    });
  }

  resetValues = () =>{
    this.setState({
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      submitError: false,
      success: false,
      goodNew: false,
      goodConfirm: false,  
    });
  }

  handleCancel = () => {
    this.setState({cancelled: true}, () => this.resetValues());
  }

  handleOnChange = event => {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleError = msg => {
    this.setState({
      submitError: true,
      errorMessage: msg,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const resetPwdObj = {
      new_pw: this.state.newPassword,
      confirm_pwd: this.state.confirmPassword,
    };
    AUTH
    .getRToken(resetPwdObj)
    .then(() => this.setState({success: true}))
    .catch(err => {
      console.log(JSON.stringify(err, null, 2));
      this.handleError(err.response.statusText);
    })
  }

  validatorListenerNew = result => this.setState({goodNew: result});

  validatorListenerConfirm = result => this.setState({goodConfirm: result});
  
  render() {
    const {classes} = this.props;
    const {goodNew, goodConfirm, success} = this.state;


    if (success) {
      setTimeout(() => {
        return (
          <Redirect to='/login' />
        );
      }, 2000)
    }
    return (
    <ValidatorForm 
      onSubmit={this.handleSubmit}
      className={classes.form}
    >

    <GridContainer justify="center" spacing={24}>
      <GridItem xs={12} sm={7}>
        <Typography variant="h4" gutterBottom>
        Reset Password
        </Typography>
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextValidator
          className={classes.hSpace}
          id="new-password"
          name="newPassword"
          type="password"
          label="New Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.customFormControlClasses}>
                <VpnKey className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            placeholder: "Enter new password..."
          }}
          validators={['required',`minStringLength:${MinPasswordLength}`, `maxStringLength:${MaxPasswordLength}`]}
          errorMessages={['New password is required', `At least ${MinPasswordLength} characters long`, `Must be less than ${MaxPasswordLength}`]}
          validatorListener={this.validatorListenerNew}
          value={this.state.newPassword}
          onChange={this.handleOnChange}
        />
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextValidator
          className={classes.hSpace}
          id="confirm-password"
          name="confirmPassword"
          type="password"
          label="Confirm New Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.customFormControlClasses}>
                <VpnKey className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            placeholder: "Confirm new password..."
          }}
          validators={['required',`minStringLength:${MinPasswordLength}`, `maxStringLength:${MaxPasswordLength}`,`isPasswordMatch`]}
          errorMessages={['Confirm password is required', `At least ${MinPasswordLength} characters long`, `Must be less than ${MaxPasswordLength}`,`Passwords must match`]}
          validatorListener={this.validatorListenerConfirm}
          value={this.state.confirmPassword}
          onChange={this.handleOnChange}
        />
      </GridItem>
      <GridItem xs={12} sm={7}>
        <Button type="submit" color="primary" disabled={!goodNew || !goodConfirm || success}>
          Reset
        </Button>
      </GridItem>
      <GridItem xs={12} sm={9}>
      {
        this.state.submitError &&
        <TextField 
          error
          className={classes.errorText} 
          variant="outlined" 
          value={this.state.errorMessage}
        />
      }
      {
        success &&
        <TextField
          variant="filled"
          className={classes.successText}
          value = "Reset password successfully! Redirected to login."
        />
      }
      </GridItem>
    </GridContainer>
  </ValidatorForm>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);