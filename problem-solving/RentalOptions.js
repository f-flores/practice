// ============================================================================
//
// File name: RentalOptions.js
// Date: December, 2018
// Description: This component presents the end users with the rental options.
//

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import API from '../../utils/myAPI';
import Proptypes from 'prop-types';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { format, differenceInCalendarDays } from 'date-fns';
// calendar css and component
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
// @material-ui core components
import {withStyles} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
// material-ui pro components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from "components/CustomButtons/Button.jsx";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const ImageWidth = 200;
const ImageHeight = 200;

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
  hInDisplay: {
    display: "inline-block",
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

// https://github.com/Adphorus/react-date-range/blob/master/demo/src/components/Main.js
function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, 'MM/DD/YYYY');
}

// https://flaviocopes.com/how-to-format-number-as-currency-javascript/
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

class RentalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canceled: false,
      success: false,
      submitError: false,
      errorMessage: "",
      itemImg: "",
      location: "",
      description: "",
      imgUrl: "",
      price: "",
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        },
      },
      pickupTime: new Date(),
      dropoffTime: new Date(),
    };
  }

  resetValues = () => {
    this.setState({
      success: false,
      submitError: false,
      errorMessage: "",
      itemImg: "",
      location: "",
      description: "",
      imgUrl: "",
      price: "",
      pickupTime: "",
      dropoffTime: "",
      startDate: "",
      endDate: "",
    });
  }

  componentDidMount() {
    const itemId = this.props.match.params.itemId;
    this.getItem(itemId);
  }

  getItem = itemId => {
    API
      .getItem(itemId)
      .then(res => {
        console.log(res.data);
        const item = res.data;
        this.setState({
          location: item.location,
          imgUrl: item.imgUrl,
          description: item.description,
          price: item.price,
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleCancel = () => {
    this.setState({canceled: true}, () => {
      this.resetValues();
    });
  }

// https://github.com/Adphorus/react-date-range/blob/master/demo/src/components/Main.js
  handleRangeChange(which, payload) {
    console.log(which, payload);
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
  }

  handleOnChange = event => {
    // console.log(`handleOnChange`);
    event.preventDefault();
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      success: true,
    });
/*     API
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
    }) */
  }

  render() {
    const itemId = this.props.match.params.itemId;
    const {history, classes} = this.props;

    const {
      canceled,
      success,
      submitError,
      errorMessage,
      location,
      imgUrl,
      description,
      price,
      pickupTime,
      dropoffTime
    } = this.state;

    const {startDate, endDate} = this.state.dateRange.selection;

    const itemPrice = price / 100;
    const totalDays = (endDate === null) ? 0 : Math.abs(differenceInCalendarDays(startDate, endDate)) + 1;
    const totalPrice = (endDate === null) ? 0 : totalDays * itemPrice;

    if (canceled) {
      history.goBack();
    }

    if (success) {
      this.props.history.push({
        pathname:"/checkout",
        state: {
          itemId: itemId,
          startDate: startDate,
          endDate: endDate,
          itemPrice: itemPrice,
          totalDays: totalDays,
          totalPrice: totalPrice,
          pickupTime: pickupTime,
          dropoffTime: dropoffTime
        }
       });
      // Redirect to Checkout
      return (
        <Redirect
          push
          to={{
            pathname: "../../checkout",
            search: "",
            state: {
              itemId: itemId,
              startDate: startDate,
              endDate: endDate,
              itemPrice: itemPrice,
              totalDays: totalDays,
              totalPrice: totalPrice,
              pickupTime: pickupTime,
              dropoffTime: dropoffTime
            }
          }}
        />
      );
    }

    return (
      <div>
        <GridContainer justify="center" spacing={24}>
          <GridItem xs={12} sm={8}>
            <h3>Item Info</h3>
          </GridItem>
          <GridItem sm={2}>
          </GridItem>
          <GridItem  xs={12} sm={5}>
            <img src={imgUrl} alt="Item Image" width={ImageWidth} height={ImageHeight} /> <br />
          </GridItem>
          <GridItem xs={12} sm={5}>
            Location: {location} <br />
            Description: {description} <br />
            Price: {formatter.format(itemPrice)}
          </GridItem>
          <ValidatorForm
            onSubmit={this.handleSubmit}
            className={classes.form}
          >
          <GridItem sm={3}></GridItem>
          <GridItem xs={12} sm={8}>
            <h3>Rental details</h3>
          </GridItem>
          <GridItem sm={1}></GridItem>
          <GridItem xs={12} sm={3}>
            <input
              type="text"
              className={classes.hInDisplay}
              readOnly
              value={formatDateDisplay(startDate)}
            />
          </GridItem>
          <GridItem xs={12} sm={3}>
            <input
              type="text"
              className={classes.hInDisplay}
              readOnly
              value={formatDateDisplay(endDate, 'Continuous')}
            />
          </GridItem>
          <GridItem xs={12} sm={5}>
            <DateRange
              onChange={this.handleRangeChange.bind(this, 'dateRange')}
              minDate={new Date()}
              moveRangeOnFirstSelection={false}
              ranges={[this.state.dateRange.selection]}
              className={'PreviewArea'}
            />
          </GridItem>
          <GridItem xs={12} sm={5}>
            <TextValidator
              id="pickup-time"
              label="Pickup Time"
              type="time"
              name="pickupTime"
              className={`${classes.textField} ${classes.hInDisplay}`}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 60, // 1 min
              }}
              validators={['required']}
              errorMessages={['Pickup time is required.']}
              value={pickupTime}
              onChange={this.handleOnChange}
            />  
          </GridItem>
          <GridItem xs={12} sm={5}>
            <TextValidator
              id="dropoff-time"
              label="Dropoff Time"
              type="time"
              name="dropoffTime"
              className={`${classes.textField} ${classes.hInDisplay}`}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 60, // 1 min
              }}
              validators={['required']}
              errorMessages={['Dropoff time is required.']}
              value={dropoffTime}
              onChange={this.handleOnChange}
            /> 
          </GridItem>
          <GridItem sm={1}></GridItem>
          <GridItem xs={12} sm={9}>
            <h4>Total Days: {totalDays}</h4>
            <h4>Estimated Price: {formatter.format(totalPrice)}</h4>
          </GridItem>
          <GridItem xs={12} sm={7}>
            <Button onClick={this.handleCancel} color="primary">
              Cancel
            </Button>
            <Button 
              type="submit" 
              color="primary"
              disabled={false}
            >
              Checkout
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
              value = "Rented item successfully"
            />
          }
          </GridItem>


          </ValidatorForm>
        </GridContainer>
      </div>
    );
  }
}

RentalItems.propTypes = {
  classes: Proptypes.object.isRequired,
};
