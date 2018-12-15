import React, {Component} from 'react';
import Proptypes from 'prop-types';
import API from '../../utils/myAPI';
import { ImgTypes, MinItemName, MaxItemName, MinDescription, MaxDescription } from '../../constants/Consts';
import categories from '../../constants/categories.json';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// @material-ui core components
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
// material-ui pro components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
// @material-ui icons
import WallPaper from '@material-ui/icons/BrandingWatermark';
import Description from '@material-ui/icons/Description';
import AttachMoney from '@material-ui/icons/AttachMoney';
import LocationOn from '@material-ui/icons/LocationOn';
// import cloudinary from 'cloudinary';
// let cloudinary = require('cloudinary');

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// var cloudinary = require("cloudinary");


/* cloudinary.config({
  "cloud_name": process.env.CLOUDINARY_NAME,
  "api_key": process.env.CLOUDINARY_API_KEY,
  "api_secret": process.env.CLOUDINARY_API_SECRET
}); */

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
      location: "",
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
      goodLocation: false,
      goodPrice: false,
      goodCategory: false,
      goodNotes: false,
      errorMessage: "",
    }
    this.imgUrl = "";
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  resetValues = () => {
    this.setState({
      itemName: "",
      description: "",
      location: "",
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
      goodLocation: false,
      goodPrice: false,
      goodCategory: false,
      goodNotes: false,
      errorMessage: "",
    });
  }

  uploadWidget = event => {
    event.preventDefault();

    // https://cloudinary.com/documentation/upload_widget
    let myWidget = window.cloudinary.createUploadWidget({
      cloudName: process.env.REACT_APP_UPLOAD_CLOUDNAME, 
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET}, (error, res) => { 
        if (error !== undefined) {
          console.log(error);
          this.handleError(error);
        }
        console.log(res);
        if (res.event === 'success') {
          console.log(res.info.secure_url);
          this.imgUrl = res.info.secure_url;
        }
      })
    
    document.getElementById('upload_widget').addEventListener('click', function(){
        myWidget.open();
      }, false);
  }

  handleCancel = () => {
    this.setState({cancelled: true}, () => {
      this.resetValues();
    });
  }

  handleError = msg => {
    this.setState({
      submitError: true,
      errorMessage: msg,
    });
  }

  handleOnChange = event => {
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleFileSelect = event => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    console.log(event.target.files[0]); // grabs from file array
    console.log(process.env.REACT_APP_UPLOAD_PRESET);
    const extPos = imageFile.name.lastIndexOf('.');
    if (ImgTypes.includes(imageFile.name.slice(extPos + 1)) ) {
      this.setState({imgUrl: imageFile});
    } else {
      this.handleError(`Image File must be of type ${ImgTypes}`);
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const {itemName, description, location, price} = this.state;

    console.log('handleSubmit');
    const rentObj = {
      itemName: itemName,
      imgUrl: this.imgUrl,
      description: description,
      location: location,
      price: price,
    };
    API
    .postRental(rentObj)
    .then(() => this.setState({success: true}))
    .catch(err => {
      console.log(JSON.stringify(err, null, 2));
      this.handleError(err.response.statusText);
    });
  }

  validatorListenerItem = result => this.setState({goodItem: result});
  validatorListenerLocation = result => this.setState({goodLocation: result});
  validatorListenerDescription = result => this.setState({goodDescription: result});
  validatorListenerPrice = result => this.setState({goodPrice: result});
 
  render() {
    const {classes, history} = this.props;
    const {
      cancelled,
      success,
      itemName,
      location,
      description,
      price,
      goodItem,
      goodDescription,
      goodLocation,
      goodPrice,
      submitError,
      errorMessage,
      category
    } = this.state;

    if (cancelled) {
      history.goBack();
    }

    if (success) {
      setTimeout(() => history.goBack(), 1500);
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
            validators={['required',`minStringLength:${MinItemName}`, `maxStringLength:${MaxItemName}`]}
            errorMessages={['Item name is required',`At least ${MinItemName} characters long`, `Must be less than ${MaxItemName}`]}
            validatorListener={this.validatorListenerDescription}
            value={description}
            onChange={this.handleOnChange}
          />
        </GridItem>
        <GridItem xs={12} sm={7}>
          <TextValidator
            autoFocus
            id="item-location"
            name="location"
            type="text"
            label="Location"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className={classes.customFormControlClasses}>
                  <LocationOn className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              placeholder: "Location of item ..."
            }}
            validators={['required',`minStringLength:${MinDescription}`, `maxStringLength:${MaxDescription}`]}
            errorMessages={['Location is required',`At least ${MinDescription} characters long`, `Must be less than ${MaxDescription}`]}
            validatorListener={this.validatorListenerLocation}
            value={location}
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
        Select Image Rental Image:
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={this.handleFileSelect}
          />
        </GridItem>

        <GridItem xs={12} sm={7}>
        Upload Image:
        <button
          id="upload_widget"
          className="cloudinary-button"
          onClick={this.uploadWidget}
        >
          Upload files
        </button>

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
        <Button type="submit" color="primary" disabled={!goodItem || !goodDescription || !goodPrice || !goodLocation || success}>
          Update
        </Button>
      </GridItem>
      <GridItem xs={12} sm={9}>
      {
        submitError &&
        <TextField 
          error
          fullWidth
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

/*

  <label htmlFor="contained-button-file">
    <Button variant="contained" component="span" className={classes.button}>
      Upload
    </Button>
  </label>

*/