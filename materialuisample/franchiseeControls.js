import React from 'react';
import PropTypes from 'prop-types';
import API from '../../utils/myAPI';
import ContactTable from '../../ContactTable';
import FranchiseManage from './FranchiseManage';
import FranchiseInfo from './FranchiseInfo';
import AllJobsTable from '../AllJobsTable';
// @material-ui core components
import { withStyles } from '@material-ui/core/styles';
import AppBar from 'muicss/lib/react/appbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
// @material-ui icons
import Assessment from '@material-ui/icons/Assessment';
import Assignment from '@material-ui/icons/Assignment';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import SupervisedUserIcon from '@material-ui/icons/SupervisedUserCircle';
import Info from '@material-ui/icons/Info';
import Build from '@material-ui/icons/Build';
import Money from '@material-ui/icons/MonetizationOn';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class FranchiseeControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      franchise_id: "",
      franchise: {
        name: "",
        address: "",
        phone: "",
        email: "",
      }
    };
  }

  componentDidMount() {
    this.checkIfFranchiseExists();
  }

  componentDidUpdate() {
    window.scrollTo(0,0);
    document.body.scrollTop = 0;
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  // this callback function lets us know whether staff member was added in
  // the 'FranchiseInfo' component
  // ========================================================================
  getFranchiseInfo = (obj) => this.setState(obj);

  // On loading the controls component, check admin user's franchise status,
  // find out if there exists a franchise under the admin's name.
  // ====================================================================================
  checkIfFranchiseExists() {
    API
    .hasFranchise()
    .then(res => {
      const userInfo = res.data;
      console.log(userInfo);
      if (userInfo.franchise.length >= 1) {
        const franchiseInfo = userInfo.franchise[0];
        const franchiseId = franchiseInfo._id;
        const franchise = {
          name: franchiseInfo.franchiseName,
          address: franchiseInfo.address,
          phone: franchiseInfo.phoneNumber,
          email: franchiseInfo.franchiseEmail,
        }
        // console.log(`franchiseId: ${franchiseId}`);
        console.log(`FranchiseeControls franchiseId: ${JSON.stringify(franchise)}`);
        this.setState({franchise_id: franchiseId, franchise,});
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar className="mui--z3" style={{backgroundColor: '#444'}} position="static" >
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"

            color="white-alpha-12"

          >
            <Tab label="(SLanding.js)" icon={<Assessment />} />
            <Tab label="Scheduler" icon={<Assignment />} />
            <Tab label="Jobs" icon={<Build />} />
            <Tab label="Customers" icon={<PersonPinIcon />} />
            <Tab label="Staff" icon={<SupervisedUserIcon />} />
            <Tab label="Invoicing" icon={<Money />} />
            <Tab label="Business Info" icon={<Info />} />

          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer></TabContainer>}
        {value === 2 && <TabContainer><AllJobsTable  /></TabContainer>}

        {
          value === 3 && <TabContainer>
          <ContactTable
            franchiseId = {this.state.franchise_id} 
          />
          </TabContainer>
        }

        {
          value === 4 && <TabContainer>
          <FranchiseManage
            franchiseId = {this.state.franchise_id}  
          />
          </TabContainer>
        }

        {value === 5 && <TabContainer>Item Five</TabContainer>}

        {
          value === 6 && <TabContainer>
          <FranchiseInfo
            franchiseId = {this.state.franchise_id}
            franchiseName = {this.state.franchise.name}
            franchiseAddress = {this.state.franchise.address}
            franchisePhone = {this.state.franchise.phone}
            franchiseEmail = {this.state.franchise.email}
            franchiseInfo = {this.getFranchiseInfo} 
          />
          </TabContainer>
        }

      </div>
    );
  }
}

FranchiseeControls.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FranchiseeControls);
