import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
// import CustomerControls from './CustomerControls';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import API from '../../utils/myAPI';
import {MinPasswordLength, MaxPasswordLength} from '../../constants/Consts';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// @material-ui core compoenents
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from '@material-ui/core/TextField';
// @material-ui icons
import VpnKey from "@material-ui/icons/VpnKey";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
// material-ui pro components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

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
    marginLeft: `${theme.spacing.unit * 10}px`,
    width: '75%',
    fontSize: '110%',
    color: '#00ff00 !important',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    padding: '5px',
  }
});


class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.state ={
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      submitError: false,
      cancelled: false,
    }
  }

  // custom validation rule
  // https://www.npmjs.com/package/react-material-ui-form-validator
  // =================================================================
  componentDidMount() {
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
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessage: "",
      submitError: false,  
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

  handleError = (msg) => {
    this.setState({
      submitError: true,
      errorMessage: msg,
    });
  }

  areValidValues() {
    return false;
  }

  render() {
    const {classes, history} = this.props;
    const {cancelled} = this.state;

    if (cancelled) {
      return (
        <Redirect to={history.goBack()} />
      );
    }

    return (
    <ValidatorForm 
      onSubmit={this.handleSubmit}
      className={classes.form}
    >

    <GridContainer justify="center" spacing={24}>
      <GridItem xs={12} sm={7}>
        <Typography variant="title" gutterBottom>
        Change Password
        </Typography>
      </GridItem>
      <GridItem xs={12} sm={7}>
        <TextValidator
          autoFocus
          className={classes.hSpace}
          id="current-Password"
          name="currentPassword"
          type="password"
          label="Current Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" className={classes.customFormControlClasses}>
                <QuestionAnswer className={classes.inputAdornmentIcon} />
              </InputAdornment>
            ),
            placeholder: "Current password ..."
          }}
          validators={['required']}
          errorMessages={['Entering password is required']}
          value={this.state.currentPassword}
          onChange={this.handleOnChange}
        />
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
          value={this.state.confirmPassword}
          onChange={this.handleOnChange}
        />
      </GridItem>
      <GridItem xs={12} sm={7}>
        <Button onClick={this.handleCancel} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={!this.areValidValues()}>
          Update
        </Button>
        {
          this.state.submitError 
          ? <TextField 
              error
              className={classes.errorText} 
              variant="outlined" 
              value={this.state.errorMessage}
            />
          : null
        }
      </GridItem>
    </GridContainer>
  </ValidatorForm>
    );
  }
}

UpdatePassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdatePassword);