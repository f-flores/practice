import axios from "axios";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

export default {
    // signup new user 
    //  userInfo = {
    //    email: "alex@example.com" 
    //    username: "alex",
    //    password: 12345Password!,
    //    pswrdConfirmation: 12345Password!
    // }
    //
    signup: function(userInfo) {
      const data = axios.post("/auth/signup", 
        userInfo,
        {
          cancelToken: source.token
        }
      );
      return data;
    },
    // credentials: {email: "uname", password: "12345"}
    login: function(credentials) {
      const data = axios.post("/auth/login", 
        credentials,
        {
          cancelToken: source.token
        }
      );
      // console.log("in login cancelToken: source = ", JSON.stringify(source));
      // console.log("CancelToken login : source.token = ", JSON.stringify(source.token));
      return data;
    },
    // checks on session existence on backend
    loginCheck: function() {
      const data = axios.get("/auth/login",
      {
        cancelToken: source.token
      });
      return data;
    },
    // checks on session existence on backend
    adminCheck: function() {
      return true;
      // const data = axios.get("/auth/isadmin",
      // {
      //   cancelToken: source.token
      // });
      // return data;
    },
    // path to logout
    logout: function() {
/*       const data = axios.get("/auth/logout",
      {
        cancelToken: source.token
      });
      console.log(`logout data: ${JSON.stringify(data)}`);
      return data; */
      return axios.get("/auth/logout");
    },
    // cancel request
    cancelRequest: function() {
      // console.log("cancel request: ", JSON.stringify(cancel));
      source.cancel("API request cancelled.");
      return true;
    }
}