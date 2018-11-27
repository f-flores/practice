import React, {Component} from 'react';
import Proptypes from 'prop-types';
import API from '../../utils/myAPI';
import { MinItemName, MaxItemName, MinDescription, MaxDescription } from '../../constants/Consts';
import categories from '../../constants/categories.json';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// @material-ui core components
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
// material-ui pro components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
// @material-ui icons
import WallPaper from '@material-ui/icons/BrandingWatermark';
import Description from '@material-ui/icons/Description';
import AttachMoney from '@material-ui/icons/AttachMoney';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.backgroundpaper,
  },
  container: {
    display: 'grid',
    gridGap: `${theme.spacing.unit * 2}px`,
  },
  errorText: {
    fontSize: '115%',
    color: '#00ff00',
    backgroundColor: '#ffcce5',
  },
  successText: {
    fontsize: '115%',
    color: 'black',
    backgroundColor: '#ccff99',
  },
  infoText: {
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '5px',
  },
});

class PostRental extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: "",
      description: "",
      price: "",
      startDate: "",
      endDate: "",
      category: "none",
      contactNumber: "",
      postedBy: "",
      comments: "",
      cancelled: false,
      success: false,
      submitError: false,
      goodItem: false,
      goodDescription: false,
      goodPrice: false,
      goodCategory: false,
      goodNotes: false,
      errorMessage: "",
    }
  }

  resetValues = () => {
    this.setState({
      itemName: "",
      description: "",
      price: 0,
      startDate: "",
      endDate: "",
      category: "none",
      contactNumber: "",
      postedBy: "",
      comments: "",
      success: false,
      submitError: false,
      goodItem: false,
      goodDescription: false,
      goodPrice: false,
      goodCategory: false,
      goodNotes: false,
      errorMessage: "",
    });
  }

  handleCancel = () => {
    this.setState({cancelled: true}, () => {
      this.resetValues();
    });
  }

  handleOnChange = event => {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('handleSubmit');
  }

  validatorListenerItem = result => this.setState({goodItem: result});
  validatorListenerDescription = result => this.setState({goodDescription: result});
  validatorListenerPrice = result => this.setState({goodPrice: result});
 
  render() {
    const {classes, history} = this.props;
    const {cancelled, success, itemName, description, price, goodItem, goodDescription, goodPrice, submitError, errorMessage, category} = this.state;

    if (cancelled) {
      history.goBack();
    }

    if (success) {
      setTimeout(() => history.goBack(), 2000);
    }

    return (
    <div>
      <ValidatorForm
        onSubmit={this.handleSubmit}
        className={classes.form}
      >
      <GridContainer justify="center" spacing={24}>
        <GridItem xs={12} sm={7}>
          <h3>Enter rental item information</h3>
        </GridItem>
        <GridItem xs={12} sm={7}>
          <TextValidator
            autoFocus
            id="item-name"
            name="itemName"
            type="text"
            label="Item name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className={classes.customFormControlClasses}>
                  <WallPaper className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              placeholder: "Enter item name ..."
            }}
            validators={['required',`minStringLength:${MinItemName}`, `maxStringLength:${MaxItemName}`]}
            errorMessages={['Item name is required',`At least ${MinItemName} characters long`, `Must be less than ${MaxItemName}`]}
            validatorListener={this.validatorListenerItem}
            value={itemName}
            onChange={this.handleOnChange}
          />
        </GridItem>
        <GridItem xs={12} sm={7}>
          <TextValidator
            autoFocus
            id="item-description"
            name="description"
            type="text"
            label="Description"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className={classes.customFormControlClasses}>
                  <Description className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              placeholder: "Type in description of item ..."
            }}
            validators={['required',`minStringLength:${MinDescription}`, `maxStringLength:${MaxDescription}`]}
            errorMessages={['Item name is required',`At least ${MinDescription} characters long`, `Must be less than ${MaxDescription}`]}
            validatorListener={this.validatorListenerDescription}
            value={description}
            onChange={this.handleOnChange}
          />
        </GridItem>
        <GridItem xs={12} sm={7}>
          <TextValidator
            autoFocus
            id="item-price"
            name="price"
            type="text"
            label="Price per day"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className={classes.customFormControlClasses}>
                  <AttachMoney className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              placeholder: "Per day rental price ..."
            }}
            validators={['required',`minNumber:0`,'matchRegexp:^[0-9]+(,[0-9]{3})*(\.[0-9]{1,2})?$']}
            errorMessages={['Price is required',`Price must be greater than 0`,'Valid price must be entered.']}
            validatorListener={this.validatorListenerPrice}
            value={price}
            onChange={this.handleOnChange}
          />
        </GridItem>
        <GridItem xs={12} sm={7}>
          Select Category:
          <select
            required
            name="category"
            value={category}
            placeholder="Select"
            onChange={this.handleOnChange}
          >
            <option value="none">Choose category</option>
            {
              categories.map(cat => {
                return (
                  <option key={cat.id} value={cat.category}>{cat.category}</option>
                )
              })
            }
          </select>
        </GridItem>
        <GridItem xs={12} sm={7}>
        <Button onClick={this.handleCancel} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={!goodItem || !goodDescription || !goodPrice || success}>
          Update
        </Button>
      </GridItem>
      <GridItem xs={12} sm={9}>
      {
        submitError &&
        <TextField 
          error
          className={`${classes.errorText} ${classes.infoText}`} 
          variant="outlined" 
          value={errorMessage}
        />
      }
      {
        success &&
        <TextField
          variant="filled"
          fullWidth
          className={`${classes.successText} ${classes.infoText}`}
          value = "Posted rental item successfully!"
        />
      }
      </GridItem>

      </GridContainer>  
      </ValidatorForm>
    </div>
    );
  }
}

PostRental.propTypes = {
  classes: Proptypes.object.isRequired,
};

export default withStyles(styles)(PostRental);