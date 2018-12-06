// =============================================
//
// File name: RentalItems.js
// Date: December, 2018
// Description: This file handles the selection
//  of a rental item (once the 'rent' button is
//  pressed).
//
// =============================================

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import RentalOptions from './RentalOptions';
import Button from "components/CustomButtons/Button.jsx";

class RentalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelected: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = event => {
    const {itemId} = this.props;

    event.preventDefault();
    console.log(`RentalItems(): itemId: ${itemId}`);
    this.setState({itemSelected: true});
  }

  render() {
    const {itemClasses, itemId} = this.props;
    const {itemSelected} = this.state;

    if (itemSelected) {
      return (
        <Redirect to={`/rentaloptions/${itemId}`}/>
      );
    }

    return (
      <div>
        <Button 
          link 
          className={itemClasses.actionButton}
          onClick={this.handleClick}
        >
          Rent
        </Button>
      </div>
    );
  }
}

export default RentalItems;