import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {MinAddressLength, MaxAddressLength, MinCompanyLength, MaxCompanyLength,
        MinPhoneLength, MaxPhoneLength} from '../../constants/Consts';
import API from '../../utils/myAPI';
import FranchiseCreatedModal from './FranchiseCreatedModal';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
// @material-ui icons
import Business from '@material-ui/icons/Business';
import ContactMail from "@material-ui/icons/ContactMail";
import ContactPhone from "@material-ui/icons/ContactPhone";
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import FranchiseUpdateScreen from './FranchiseUpdateScreen';


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
});

class FranchiseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doesFranchiseExist: false,
      submittingFranchise: false,
      isModalUpdated: false,
      franchiseInfoUpdated: false,
      franchise: {
        name: "",
        address: "",
        phone: "",
        email: "",
      }
    };
    this.checkIfFranchiseExists = this.checkIfFranchiseExists.bind(this);
    this.getFranchiseInfo = this.getFranchiseInfo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
/*     window.scrollTo(0, 0);
    document.body.scrollTop = 0; */

    this.checkIfFranchiseExists();
  }

  componentDidUpdate() {
    // console.log(`FranchiseInfo componentDidUpdate props.franchiseId: ${this.props.franchiseId}`);
    if (this.state.isModalUpdated) {
      this.setState({isModalUpdated: false, submittingFranchise: false});
      this.getFranchiseInfo(this.props.franchiseId);
    }
    if (this.state.franchiseInfoUpdated) {
      this.setState({franchiseInfoUpdated: false,});
      this.getFranchiseInfo(this.props.franchiseId);
    }
  }

  // this callback function lets us know whether a user type was changed in
  // the 'FranchiseCreatedModal' component
  // ========================================================================
  getModalResult = (obj) => this.setState(obj);

  // this callback function lets us know whether a franchise info item
  // was changed in the 'FranchiseUpdateScreen' component
  // ========================================================================
  getUpdateResult = (obj) => this.setState(obj);

  checkIfFranchiseExists() {
    // check admin user's franchise status , find out if one exists.
    const {franchiseId, franchiseName} = this.props;
    // console.log(`FranchiseInfo checkIfFranchiseExists() franchiseId: ${franchiseId} franchiseName: ${franchiseName}`);

    if (franchiseId !== "" && franchiseId !== "undefined") {
      this.setState({doesFranchiseExist: true});
    }
  }

  getFranchiseInfo(id) {
    // console.log(`FranchiseInfo getFranchiseInfo() hello id: ${id}`);
    API
    .getFranchise(id)
    .then(res => {
      const franchiseInfo = res.data;
      let franchise = {
        name: franchiseInfo.franchiseName,
        address: franchiseInfo.address,
        phone: franchiseInfo.phoneNumber,
        email: franchiseInfo.franchiseEmail,
      }
      // console.log(`in FranchiseInfo() API.getFranchise franchise: ${JSON.stringify(franchise)}`);
      this.props.franchiseInfo({franchise});
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  handleChange = (event) => {
    const { franchise } = this.state;
    // console.log(`state franchise: ${franchise}FranchiseInfo handleChange: name: ${event.target.name}, value: ${event.target.value}`);
    franchise[event.target.name] = event.target.value;
    this.setState({...this.state, franchise });
  }

  handleSubmit = () => {
    // const {franchise} = this.state;
    // console.log(`in handlesubmit franchise: ${JSON.stringify(franchise)}`);
    // post franchise
    const postObj = {
      franchiseName: this.state.franchise.name,
      address: this.state.franchise.address,
      phoneNumber: this.state.franchise.phone,
      franchiseEmail: this.state.franchise.email,
    };

    API
    .postFranchise(postObj)
    .then(res => {
      // console.log(`FranchiseInfo handleSubmit res.data: ${JSON.stringify(res.data)}`);
      this.props.franchiseInfo({
        franchise_id: res.data._id,
        ...this.state
      });
      this.setState({doesFranchiseExist: true, submittingFranchise: true});
    })
    .catch(err => {
      console.log(`error: ${err}`);
    })
  }

  render() {
    const { classes, franchiseId, franchiseName, franchiseAddress, franchisePhone, franchiseEmail,} = this.props;
    // console.log("FranchiseInfo render()", JSON.stringify(this.props));

    if (!this.state.doesFranchiseExist) {
      return (
        <GridContainer justify="center">
        <GridItem xs={12} sm={5} md={5}>
        <div className={classes.textCenter}>
          <h3 className={classes.socialTitle}>
            Enter Franchise Info
          </h3>
        </div>
        <ValidatorForm 
          onSubmit={this.handleSubmit}
          className={classes.form}
        >
          <GridItem xs={12} className={classes.vSpace}>
            <TextValidator
              id="franchise-name"
              name="name"
              label="Business name"
              autoComplete="fname"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" className={classes.customFormControlClasses}>
                    <Business className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                placeholder: "Company name ..."
              }}
              validators={['required',`minStringLength:${MinCompanyLength}`, `maxStringLength:${MaxCompanyLength}`]}
              errorMessages={['this field is required', `At least ${MinCompanyLength} characters long`, `Must be less than ${MaxCompanyLength}`]}
              value={this.state.franchise.name}
              onChange={this.handleChange}
            />
          </GridItem>
          <GridItem xs={12} className={classes.vSpace}>
            <TextValidator
              id="franchise-address"
              name="address"
              label="Business Address"
              autoComplete="faddress"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactMail className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                placeholder: "Enter address ..."
              }}
              validators={['required',`minStringLength:${MinAddressLength}`, `maxStringLength:${MaxAddressLength}`]}
              errorMessages={['address is required', `At least ${MinAddressLength} characters long`, `Must be less than ${MaxAddressLength}`]}
              value={this.state.franchise.address}
              onChange={this.handleChange}
            />              
          </GridItem>
          <GridItem xs={12} className={classes.vSpace}>
            <TextValidator
              id="phone-number"
              name="phone"
              label="Phone Number"
              autoComplete="fphone"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ContactPhone className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                placeholder: "Phone number ..."
              }}
              validators={['required',`minStringLength:${MinPhoneLength}`, `maxStringLength:${MaxPhoneLength}`]}
              errorMessages={['phone is required', `At least ${MinPhoneLength} characters long`, `Must be less than ${MaxPhoneLength}`]}
              value={this.state.franchise.phone}
              onChange={this.handleChange}
            />              
          </GridItem>
          <GridItem xs={12} className={classes.vSpace}>
            <TextValidator
              id="company-email"
              name="email"
              label="Business Email"
              autoComplete="femail"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email className={classes.inputAdornmentIcon} />
                  </InputAdornment>
                ),
                placeholder: "Email ..."
              }}
              validators={['required','isEmail']}
              errorMessages={['email is required', 'Please enter valid email']}
              value={this.state.franchise.email}
              onChange={this.handleChange}
            />              
          </GridItem>
          <div className={classes.textCenter}>
            <Button 
            type="submit"
            round color="primary">
              Submit Info
            </Button>
          </div>
        </ValidatorForm>
      </GridItem>
      </GridContainer>
      );
    } 
    if (this.state.submittingFranchise) {
      return (
        <FranchiseCreatedModal
          modalTitle="Franchise Successfully Created"
          modalContent="Business name, address, email and phone number available. You can update information later" 
          sendModalResult={this.getModalResult}
        />
      );
    }

    return (
      <FranchiseUpdateScreen
        franchiseName={franchiseName}
        franchiseAddress={franchiseAddress}
        franchisePhone={franchisePhone}
        franchiseEmail={franchiseEmail}
        franchiseId={franchiseId}
        sendUpdate={this.getUpdateResult}
      />
    );
  }
}

FranchiseInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FranchiseInfo);