import React, { Component } from 'react';
import api from '../services/api';
import './DibCell.css';

// TODO: Add ability to actually claim a dib.
// TODO: Update our “Dibs?” text to say “Claimed!” if the dib is already taken

export default class DibCell extends Component {
  claimDib = async () => {
    this.setState({ error: null });

    try {
      await api.claimDib();
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error claiming dib', error);
    }
  };

  render() {
    const { title, creator } = this.props;

    return (
      <div className="dib-container">
        <div className="dib-left">
          <div className="dib-creator">
            <b>{creator}</b> is offering
          </div>
          <div className="dib-title">{title}</div>
        </div>
        <div className="dib-right">
          <button className="dib-claim-button">Dibs?</button>
        </div>
      </div>
    );
  }
}
