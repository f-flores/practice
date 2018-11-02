/* eslint-disable react/no-array-index-key */
import React, { PureComponent, Component } from 'react';
import { Button, DialogContainer, NavigationDrawer, SVGIcon } from 'react-md';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import menu from '../icons/menu.svg';
import arrowBack from '../icons/arrow_back.svg';
import inboxListItems from '../constants/inboxListItems';
import loremIpsum from 'lorem-ipsum';
import MoreInfoButton from 'muicss/lib/react/button';
import GoogleMap from '../components/GoogleMaps/GoogleMap'
import UserGoogleMap from '../components/GoogleMaps/UserGoogleMap';


import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import EnhancedContactJobTable from "../components/EnhancedContactJobsTable.js"
import JobEstimateStepper from '../components/JobEstimateStepper.js'
import Geocode from "react-geocode";
import NavigationDrawerTab1Content from '../components/NavigationDrawerTab1Content'

import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import cardsStyle from "assets/jss/material-kit-pro-react/views/componentsSections/sectionCards.jsx";

import ContactDeleteButton from '../components/ContactDeleteButton'

 
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey("AIzaSyDx4X3UrnsHeCEvYsq_peDopq1b3Y7tDTU");
 
// Enable or disable logs. Its optional.
Geocode.enableDebug();


const ContactInfoDrawerTab = (props) => (
    <div>
    <Container fluid={true}>
        <Row>
          <Col md="6">
            <Card>
            <UserGoogleMap lng={props.lng}
            lat={props.lat} />
            </Card>
            </Col>
            <Col md="6">
            <NavigationDrawerTab1Content contactName={props.contactName} {...props}  />
          </Col>
        </Row>
    </Container>
  </div>
)

const ContactJobsDrawerTab = (props) => (
  <Row>
  <Col md="12">
    <EnhancedContactJobTable contactDetails={props.contactDetails} contactName={props.contactName} contactPhone={props.contactPhone} contactEmail={props.contactEmail} rowData={props.contactJob} contactJob={props.contactJob} addJob={props.addJob}/>
  </Col>
  </Row>
)

const JobEstimateDrawerTab = (props) => (
  <Row>
  <Col md="12">
    <JobEstimateStepper contactDetails={props.contactDetails} contactName={props.contactName} contactPhone={props.contactPhone} contactEmail={props.contactEmail} />
  </Col>
  </Row>
)

const ContactSettingsDrawerTab = (props) => (
  <Row>
  <Col md="12">
    <ContactDeleteButton onClick={() => {props.onDeleteClick(props.contactId)}}/>
  </Col>
  </Row>
)



class Simple extends Component {
  constructor() {
    super();

    // Update the items so they have an onClick handler to change the current page
    this.navItems = inboxListItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return {
        ...item,
        onClick: () => this.setPage(item.key, item.primaryText),
      };
    });

 


    this.state = {
      renderNode: null,
      visible: false,
      checked: false,
      key: inboxListItems[0].key,
      page: inboxListItems[0].primaryText,
      lng: 0,
      lat: 0
    };
  }

  componentDidMount = () => {
    // Get latidude & longitude from address.
    Geocode.fromAddress(this.props.contactDetails).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          ...this.state,
          lat,
          lng
        })
      },
      error => {
        console.error(error);
      }
    );
  }


  setPage = (key, page) => {
    this.navItems = this.navItems.map((item) => {
      if (item.divider) {
        return item;
      }

      return { ...item, active: item.key === key };
    });

    this.setState({ key, page });
  };

  show = () => {
    this.setState({ visible: true });
    window.scrollTo(0,100);
  };

  hide = () => {
    this.setState({ visible: false, renderNode: null });
  };

  handleShow = () => {
    this.setState({ renderNode: document.getElementById('navigation-drawer-demo') });
  };

  render() {
    const { visible, page, renderNode, checked } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <MoreInfoButton className="mui--z2" style={{backgroundColor: "#4cb969",}} raised="true" onClick={this.show}>(NavigationDrawers/Simple)</MoreInfoButton>
        <DialogContainer
          id="navigation-drawer-demo"
          aria-label="Navigation Drawer Demo"
          fullPage
          visible={visible}
          focusOnMount={false}
          onShow={this.handleShow}
          onHide={this.hide}
          color="primary"
        >
          <NavigationDrawer
            renderNode={renderNode}
            navItems={this.navItems}
            mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
            tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
            toolbarTitle={this.props.contactName + ', ' + this.props.contactDetails}
            toolbarActions={<Button icon onClick={this.hide}>close</Button>}
            contentId="main-demo-content"
            temporaryIcon={<SVGIcon use={menu.url} />}
            persistentIcon={<SVGIcon use={arrowBack.url} />}
            contentClassName="md-grid"
           
          >
            <Container fluid={true}>
            {{
              contactInfo: <ContactInfoDrawerTab lng={this.state.lng} lat={this.state.lat} {...this.props}/>,
              contactJobs: <ContactJobsDrawerTab {...this.props}/>,
              estimateStepper: <JobEstimateDrawerTab {...this.props}/>,
              contactSettings: <ContactSettingsDrawerTab {...this.props} />
            }[this.state.key]}
            </Container>
          </NavigationDrawer>
        </DialogContainer>
      </div>
    );
  }
}

export default Simple;
