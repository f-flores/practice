import React, {Component} from 'react';
import {AppName} from '../constants/Consts';
import SuperDrawer from '../SuperDrawer';
import NavigationDrawer from '../../src/NavigationDrawers/Simple';

class SAdminDashboard extends Component {


  render() {
    return (
      <div>
        <h2>{AppName}</h2>
        <SuperDrawer />
        <NavigationDrawer />
        
      </div>
    );
  }
}

export default SAdminDashboard;