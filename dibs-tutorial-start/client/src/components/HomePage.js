import React, { Component } from 'react';
import CreateNewDib from './CreateNewDib';
import SignIn from './SignIn';
import api from './../services/api';
import DibCell from './DibCell';

// TODO: Subscribe to Change Stream and update when dib changes.

export default class HomePage extends Component {
  state = {
    username: localStorage.getItem('username') || 'Default User',
    dibs: [],
  };

  componentDidMount = () => {
    this.loadDibs();
  };

  loadDibs = async () => {
    // TODO: Load all data and save it in state.
    const result = await api.getDibs();
    this.setState({
      dibs: result.data,
    });
  };

  onUsernameChange = username => {
    localStorage.setItem('username', username);
    this.setState({ username });
  };

  render() {
    const { username, dibs } = this.state;

    return (
      <div>
        <header>
          <h1>Got Dibs?</h1>
        </header>
        <SignIn username={username} onUsernameChange={this.onUsernameChange} />
        <br />
        <CreateNewDib onSuccess={this.loadDibs} username={username} />
        <div>
          {
            dibs.map(item =>
            <DibCell key={item._id}
              {...item}
            />)
          }
        </div>
      </div>
    );
  }
}
