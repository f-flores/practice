// =============================================================================
//
// File name: CreateAccountOption.js
// Date: November, 2018
// Description: This file activates or deactivates a customer's account. When a
//  customer account is activated, an email is sent to that customer, and he
//  or she updates their password.
//
// =============================================================================

import React, {Component} from 'react';
import API from './../../utils/myAPI';
import AUTH from './../../utils/AUTH';
import {DefaultNewCustomerPassword, DefaultCustomerType} from './../../constants/Consts';
// @material-ui/core components
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
// @material core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


const assembleEmail = (name) => {
  let msgStr = '';

  msgStr = `
    <div>
      <h4>${name},</h4>
        <h3>
        Welcome to our scheduling application services.
        </h3>
      <h4>
      Thank you,<br />
      Team at Scheduling App services.
      </h4>
    </div>
  `;
  return msgStr;
}

class CreateAccountOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      createAccountError: false,
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signupCustomer = this.signupCustomer.bind(this);
    this.sendFirstSubscriptionEmail = this.sendFirstSubscriptionEmail.bind(this);
  }

  // grab customer's activation status from backend and set 'checked' state
  // to 'activeAccount' boolean
  // ======================================================================
  componentDidMount() {
    const {contactId} = this.props;
    API
    .getCustomer(contactId)
    .then(res => this.setState({checked: res.data.activeAccount}) )
    .catch(err => console.log(err.response.data)) 
  }

  handleChange = () => {
    this.setState({checked: !this.state.checked}, () => {
      this.handleChecked();
    });
  }

  handleChecked = () => {
    const {checked} = this.state;
    const {contactName} = this.props;

    if (checked) {
      let firstName = contactName.substring(0, contactName.indexOf(' '));
      let msgString = assembleEmail(firstName);
      this.signupCustomer(msgString);
    } else {
        console.log(`deactivate account here, change userType to default user`);
        this.updateAccountStatus();
    }
  }

  // create customer account using customer's email and contact name, on success,
  // send first subscription email. Note that userType is 'customer'.
  // =============================================================================
  signupCustomer = (msg) => {
    const {contactEmail, contactName} = this.props;
    const userName = contactName.substring(0, contactName.indexOf('@'));
    AUTH
    .signup({ 
      user_name: userName,
      email: contactEmail,
      user_pw: DefaultNewCustomerPassword,
      confirm_pwd: DefaultNewCustomerPassword,
      userType: DefaultCustomerType, 
    })
    .then(res => {
      console.log(JSON.stringify(res.data));
      this.sendFirstSubscriptionEmail(msg);
    })
    .catch(err => {
      // find out if user is not already member or had active account
      console.log(err);
     });  
  }

  sendFirstSubscriptionEmail = (msg) => {
    const {contactEmail, contactName} = this.props;
    API
    .postNewSubscriberMail({
      subscribeEmail: contactEmail,
      subscribeName: contactName,
      msg: msg
    })
    .then(res => {
      console.log('successfully sent mail');
      console.log(res.data.confirmMsg);
      this.updateAccountStatus();
    })
    .catch(err => console.log(err));
  }

  // update activeAccount status on backend....
  // =================================================================
  updateAccountStatus() {
    const {checked} = this.state;
    const {contactId} = this.props;
    API
    .updateAccountStatus(contactId, {activeAccount: checked})
    .then(() => console.log(`updated account status successful`))
    .catch(err => console.log(err));
  }

  render() {
    const {classes, contactName, contactEmail} = this.props;
    const {checked} = this.state;

    return (
      <GridContainer>
        <GridItem xs={12}>
          <div className={classes.root}>
          {checked 
            ? <h3>Deactivate {contactName}'s Account</h3>
            : <h3>Activate {contactName}'s Customer Account</h3>
          }
          <Switch
            checked={checked}
            onChange={this.handleChange} 
            aria-label="Collapse" 
          />
          <Fade in={checked}>
            <Paper elevation={4} className={classes.paper}>
              <h4>{contactEmail} is currently active.</h4>
            </Paper>
          </Fade>
          </div>
        </GridItem>
      </GridContainer>

  )
  }

 }

export default CreateAccountOption;