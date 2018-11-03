import React, {Component} from 'react';
import API from '../../utils/myAPI';
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Fade from '@material-ui/core/Fade';
// @material core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

const styles = theme => ({
  root: {
    height: 180,
  },
  paper: {
    margin: theme.spacing.unit,
  },
  svg: {
    width: 100,
    height: 100,
  },
});

class CreateAccountOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      example: "",
      checked: false,
    };
    this.handleChecked = this.handleChecked.bind(this);
  }

  // grab customer's activation status from backend
  componentDidMount() {

  }

  handleChange = () => {
    console.log(`!this.state.checked: ${!this.state.checked}`);
    console.log(`this.state.checked: ${this.state.checked}`);
    this.setState({checked: !this.state.checked}, () => {
      console.log(`cao handleChange() checked: ${this.state.checked}`);
      this.handleChecked();
    });
  }

  handleChecked = () => {
    const {checked} = this.state;
    const {contactId} = this.props;
    console.log(`CreateAccountOption handleChecked() checked: ${checked}`);
    if (checked) {
      console.log(`change userType to customer when it is created, possibly post new user and give default password, and nodemail here`);
    } else {
        console.log(`deactivate account here, change userType to default user`);
    }

    // post activeAccount status on backend....
    API
    .updateAccountStatus(contactId, {activeAccount: checked})
    .then(res => {
      console.log(`CreateAccountOption handleChecked() updateAccountStatus result ${res.data.activeAccount}`);
      console.log(res.data);
      // this.props.account
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const {classes, contactName, contactEmail} = this.props;
    const {checked} = this.state;
    // console.log(`CreateAccountOption props: ${JSON.stringify(this.props)}`);
    return (
      <GridContainer>
        <GridItem xs={12}>
          <div className={classes.root}>
          {checked 
            ? <h3>Deactivate {contactName}'s Account</h3>
            : <h3>Activate {contactName}'s Customer Account</h3>
          }
          <Switch
            checked={checked}
            onChange={this.handleChange} 
            aria-label="Collapse" 
          />
          <Fade in={checked}>
            <Paper elevation={4} className={classes.paper}>
              <h4>{contactEmail} is currently active.</h4>
            </Paper>
          </Fade>
          </div>
        </GridItem>
      </GridContainer>

  )
  }

 }

 export default withStyles(styles)(CreateAccountOption);

 /*

     API
    .getCustomer(contactId)
    .then(res => {
      console.log(`CreateAccountOption() -- res.data:`);
      console.log(res.data);
      // set active account
      // this.setState checked to res.data.activeAccount
    })
    .catch(err => {
      console.log(err);
      // console.log(err.response.data);
    }) 

  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },

 */