// =============================================
//
// File name: ViewRentals.js
// Date: December, 2018
// Description: Leveraging material-pro react kit's ShoppingCartStyle, view rentals lists the rental items available.
//
// =============================================

import React, {Component} from 'react';
// import Proptypes from 'prop-types';
import API from '../../utils/myAPI';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// @material-ui core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "components/Header/Header.jsx";
import {withStyles} from '@material-ui/core';
import Parallax from "components/Parallax/Parallax.jsx";
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Footer from "components/Footer/Footer.jsx";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import shoppingCartStyle from "assets/jss/material-kit-pro-react/views/shoppingCartStyle.jsx";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";
import RentalItems from './RentalItems';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = {
  titleColor: {
    color: 'red !important',
  },
};

class ViewRentals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: "",
      rentalItems: [],
      rentalData: [],
      error: false,
    }
  }

  componentDidMount() {
    this.getRentals();
  }

  getRentals() {
    API
    .getRentals()
    .then(res => {
      console.log(`results`);
      console.log(res);
      this.setState({
        rentalItems: res.data
      }, 
        () => this.setTableData()
      );
    })
    .catch(err => {
      console.log(err);
    });
  }

  setTableData() {
    const { classes } = this.props;
    const { rentalItems } = this.state;
    const elemArr = [];

    rentalItems.map((item, index) => {
      let arr = [];
      const numRow = index + 1;
      const itemPrice = item.price / 100;

      const item1 = 
        <div key={item._id} className={classes.imgContainer}>
          <img src={product1} alt="..." className={classes.img} />
        </div>;

      const item2 = 
        <span>
          <a href="#jacket" className={classes.tdNameAnchor}>
          {item.itemName}
          </a>
          <br />
          <small className={classes.tdNameSmall}>
          by Owner Of Item
          </small>
        </span>;

      const item3 = 
        <span>
          {item.description}
        </span>;
 
      const item4 = 
        <span>
          {item.location}
        </span>;

      const item5 = 
        <span>
          <small className={classes.tdNumberSmall}>
          $
          </small>
          {itemPrice.toFixed(2)}
        <br />
          <small className={classes.tdNameSmall}>
          per day
          </small>
        </span>;

    const item6 =
      <Tooltip
        id={`close${numRow.toString()}`}
        title="Rent item"
        placement="left"
        classes={{ tooltip: classes.tooltip }}
      >
        <RentalItems
          itemId = {item._id}
          itemClasses = {classes}
        />
      </Tooltip>;

      arr.push(item1, item2, item3, item4, item5, item6);
      elemArr.push(arr);
    });

    this.setState({ rentalData: elemArr});
  }

  render() {
    const { rentalData} = this.state;
    const { classes } = this.props;

    return(
    <div>
      <Parallax
        image={require("assets/img/examples/bg2.jpg")}
        filter="dark"
        small
      >
      <div className={classes.container}>
        <GridContainer>
          <GridItem
            md={8}
            sm={8}
            className={classNames(
              classes.mlAuto,
              classes.mrAuto,
              classes.textCenter
            )}
          >
            <h2 className={classes.title}>View Rentals</h2>
          </GridItem>
        </GridContainer>
      </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Card plain>
            <CardBody plain>
              <h3 className={classes.cardTitle}>Available Rentals</h3>
              <Table
              tableHead={[
                "",
                "ITEM",
                "DESCRIPTION",
                "LOCATION",
                "PRICE",
                ""
              ]}
              tableData={rentalData}
            tableShopping
            customHeadCellClasses={[
              classes.textCenter,
              classes.description,
              classes.description,
              classes.textRight,
              classes.textRight,
              classes.textRight
            ]}
            customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
            customCellClasses={[
              classes.tdName,
              classes.customFont,
              classes.customFont,
              classes.tdNumber,
              classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
              classes.tdNumber + " " + classes.textCenter
            ]}
            customClassesForCells={[1, 2, 3, 4, 5, 6]}
          />

            </CardBody>
          </Card>
        </div>
      </div>
    </div>
    );
  }
}

export default withStyles(shoppingCartStyle)(ViewRentals);