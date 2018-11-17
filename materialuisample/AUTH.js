import axios from "axios";

let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default {
    // signup new user 
    //  userInfo = {
    //    email: "username@example.com" 
    //    username: "username",
    //    password: 123password,
    //    pswrdConfirmation: 123password
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
    // credentials: {email: "uname@example.com", password: "12345"}
    login: function(credentials) {
      const data = axios.post("/auth/login", 
        credentials,
        {
          cancelToken: source.token
        }
      );
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
    // get reset token
    getRToken: function(token) {
      const data = axios.get(`auth/reset/${token}`,
      {
        cancelToken: source.token
      });
      return data;
    },
    // update password based on current email
    // {email, current_pw, new_pw, confirm_new_pw}
    updatePassword: function(postInfo) {
      const data = axios.post("/auth/updatepwrd", postInfo,
      {
        cancelToken: source.token
      });
      return data;
    },
    // reset password based on current email
    resetPassword: function(token, postInfo) {
      const data = axios.post(`/auth/reset/${token}`, postInfo,
      {
        cancelToken: source.token
      });
      return data;
    },
    forgotPassword: function(postInfo) {
      const data = axios.post("/auth/forgotpassword", postInfo,
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
      source.cancel("API request cancelled.");
      // after token is cancelled, a new CancelToken is created so that each request
      // has a different token.
      CancelToken = axios.CancelToken;
      source = CancelToken.source();
      return true;
    }
}