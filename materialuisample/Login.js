import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AUTH from "../utils/AUTH";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {AppName} from "../constants/Consts";
import * as vlib from "../utils/helpers";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {TextField} from 'formik-material-ui';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing.unit * 10,
    padding: theme.spacing.unit * 2,
    width: '600px',
    textAlign: 'center',
    justify: 'center',
    alignContent: 'center',
    color: theme.palette.text.secondary,
  },
  rowOffset: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10%',
      width: '450px',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '20%',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '35%',
    },
  },
  vSpace: {
    marginBottom: theme.spacing.unit * 5,
  },
  buttonStyle: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5%',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '27%',
    },
  },
  errorText: {
    marginLeft: `${theme.spacing.unit * 10}px`,
    width: '75%',
    fontSize: '110%',
    color: 'red !important',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    padding: '5px',
  },
});


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      isLoggedIn: false,
      isFAdmin: false,
      isSuperAdmin: false,
      isEmployee: false,
      isCustomer: false,
      email: "",
      password: "",
      loginSuccess: false
    }

    this._isSuperAdmin = false;
    this._isFAdmin = false;
    this._isEmployee = false;
    this._isCustomer = false;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(obj)  {  
    switch (obj.userType) {
      case "user":
        break;
      case "superadmin":
        this._isSuperAdmin = true;
        break;
      case "admin":
        this._isFAdmin = true;
        break;
      case "employee":
        this._isEmployee = true;
        break;
      case "customer":
        this._isCustomer = true;
        break;
      default:
        break;
    }

  // ------------------------------
  // getLoginResult is callback function to parent
  // ------------------------------
  this.props.getLoginResult({
    isLoggedIn: true,
    isSuperAdmin: this._isSuperAdmin, 
    isFAdmin: this._isFAdmin,
    isEmployee: this._isEmployee,
    isCustomer: this._isCustomer, 
    email: obj.email,
    userType: obj.userType
  }, "/");


  // The promise calls the cancel request API to avoid memory leaks
  let cancelPromise = new Promise((resolve, reject) => {
    let result = AUTH.cancelRequest();
    if (result) {
      resolve("Successful cancel request.");
    } else {
      reject("Unsuccessful cancel request.");
    }
  });

  cancelPromise
  .then((msg) => {
    console.log(`${msg}`);
    this.setState({
      loginSuccess: true,
      isSuperAdmin: this._isSuperAdmin,
      isFAdmin: this._isFAdmin,
      isEmployee: this._isEmployee,
      isCustomer: this._isCustomer,
    });
    return null;
  })
  .catch((reason) => {
    // Log the rejection reason
      console.log(`Handle rejected promise ${reason} here.`);
      return null;
  });
  
}


  render() {
    // Redirect to home page On Successful Login; depending on type of user you can 
    if (this.state.loginSuccess) {
      return (this.state.isSuperAdmin === true) ? <Redirect to="/superdashboard" /> 
      :
      (this.state.isFAdmin) ? <Redirect to="/fadmindashboard" />
      :
      (this.state.isEmployee) ? <Redirect to="/edashboard" />
      :
      (this.state.isCustomer) ? <Redirect to="/cdashboard" />
      :
       <Redirect to="/public" />;
    }

    const { classes } = this.props;

    return(
    <Formik
      initialValues={{...this.state}}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email("Please enter valid email.").required("Email is required"),

          password: Yup.string().required("Password is required")
        })
      }
      onSubmit={(
        values,
        {setSubmitting, setErrors, setStatus, resetForm}
      ) => {
        AUTH
        .login({ 
          email: values.email,
          password: values.password,
        })
        .then(res => {
          console.log(JSON.stringify(res.data));
          setStatus({success: true});
          resetForm();
          this.handleSubmit(res.data);
          setSubmitting(false); 
        })
        .catch(err => {
          setStatus({success: false});
          // setErrors({loginSuccess: err.message});
          setErrors({loginSuccess: "Invalid username or password. Try again or signup."});
          setSubmitting(false); 
        });     
      }}
      render={({
        errors,
        touched,
        handleSubmit,
        isSubmitting
      }) => (
      <div className={classes.root}>
        <Grid container className={classes.vSpace}>
          <Paper className={`${classes.paper} ${classes.rowOffset}`}>
            <Grid item xs={12}>
              <h2>Login To {AppName}</h2>
            </Grid>

            <Grid item xs={12}>
            <Form>

              {/* Enter email field */}
              <Grid item xs={12} className={classes.vSpace}>
                <Field type="email" label="Email" name="email" component={TextField} />
                { touched.email && errors.email 
                  ? <p>{/* errors.email */}</p>
                  :  touched.email ? null : null}
              </Grid>

              {/* Enter password field */}
              <Grid item xs={12} className={classes.vSpace}>
                <Field type="password" label="Password" name="password" component={TextField} />
                { touched.password && errors.password 
                    ? <p>{/* errors.password */}</p>
                    : touched.password ? null : null}
              </Grid>

              <Grid item xs={12} sm={6} className={`${classes.vSpace} ${classes.buttonStyle}`}>
                <Button 
                  variant="raised"
                  color="primary"
                  type="submit"
                  disabled={ isSubmitting || !vlib.isEmptyObject(errors) || !(touched.email || touched.password)}
                  onClick={handleSubmit}
                >
                Login
                </Button>
              </Grid>

              <br />
              {/* backend validation */}
              {errors.loginSuccess ? <p className={classes.errorText}>{errors.loginSuccess}</p> : null}       
            </Form>
            </Grid>
          </Paper>
        </Grid>
      </div>
      )}
    />
  )}
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);