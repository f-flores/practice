
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui icons
import Business from '@material-ui/icons/Business';
import ContactMail from "@material-ui/icons/ContactMail";
import ContactPhone from "@material-ui/icons/ContactPhone";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from "components/CustomButtons/Button.jsx";
import signupPageStyle from "assets/jss/material-kit-pro-react/views/signupPageStyle.jsx";


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class FranchiseInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [1]
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <GridContainer justify="center">
      <GridItem xs={12} sm={5} md={5}>
      <div className={classes.textCenter}>
        <h3 className={classes.socialTitle}>
          Enter Franchise Info
        </h3>
      </div>
      <form className={classes.form}>
        <CustomInput
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses
          }}
          inputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                <Business
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            placeholder: "Business Name..."
          }}
        />
        <CustomInput
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses
          }}
          inputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                <ContactMail
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            placeholder: "Address..."
          }}
        />
        <CustomInput
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses
          }}
          inputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                <ContactPhone
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            placeholder: "Phone number..."
          }}
        />
        <CustomInput
          formControlProps={{
            fullWidth: true,
            className: classes.customFormControlClasses
          }}
          inputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                className={classes.inputAdornment}
              >
                <Email
                  className={classes.inputAdornmentIcon}
                />
              </InputAdornment>
            ),
            placeholder: "Company email..."
          }}
        />
        <div className={classes.textCenter}>
          <Button round color="primary">
            Get started
          </Button>
        </div>
      </form>
    </GridItem>
    </GridContainer>
    );
  }
}

FranchiseInfo.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool
};

export default withStyles(styles)(FranchiseInfo);