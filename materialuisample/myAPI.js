import axios from "axios";
let CancelToken = axios.CancelToken;
let source = CancelToken.source();

export default {
    getContacts: async function(){
        return await axios.get("/api/contacts")
    },
    // get all users, only available to administrative user
    getUsers: async function() {
      return await axios.get("api/users");
    },
    // get User's franchise id
    getUserFranchise: async function() {
      return await axios.get("api/usersfranchise");
    },
    // get all franchises, only available to superadmin user
    getFranchises: async function() {
      return await axios.get("api/franchise", {});
    },
    // get franchise, available to admin
    getFranchise: async function(id) {
      return await axios.get(`api/franchise/${id}`);
    },
    // get franchise members, available to admin
    getMembers: async function(id) {
      return await axios.get(`api/franchisemembers/${id}`);
    },
    // get franchise customers, available to admin
    getCustomers: async function(id) {
      return await axios.get(`api/franchisecustomers/${id}`);
    },
    // get franchise customer, available to admin
    getCustomer: async function(id) {
      return await axios.get(`api/contacts/${id}`);
    },
    // does franchise exist for current user, available to admin
    hasFranchise: async function() {
      return await axios.get(`api/admin`);
    },
    addUser: async function(postInfo) {
      return await axios.post("/api/contacts", postInfo);
    },
    // Post User
    postUsers: function(postInfo) {
      return axios.post("/api/users", postInfo);
    },
    // Post Franchise
    postFranchise: async function(postInfo) {
      console.log(`myAPI() postInfo: ${JSON.stringify(postInfo)}`);
      return await axios.post("/api/franchise", postInfo);
    },
    // Post Franchise Member
    postFranchiseMember: async function(id, postInfo) {
      console.log(`myAPI() postInfo: ${JSON.stringify(postInfo)}`);
      return await axios.post(`/api/franchisemembers/${id}`, postInfo);
    },
    // Post Franchise Customer
    postFranchiseCustomer: async function(id, postInfo) {
      console.log(`myAPI() postFranchiseCustomer: ${JSON.stringify(postInfo)}`);
      return await axios.post(`/api/franchisecustomers/${id}`, postInfo);
    },
    // Update Users
    updateUsers: function(id, body) {
      return axios.put(`/api/users/${id}`, body)
    },
    // Update User Type
    updateUserType: function(id, body) {
      return axios.put(`/api/admin/${id}`, body)
    },
    // Update Customer's Account status
    updateAccountStatus: function(id, body) {
      return axios.put(`/api/contacts/${id}`, body)
    },
    // Update Franchise
    updateFranchise: function(id, body) {
      const data = axios.put(`/api/updatefranchise/${id}`, body,
      {
        cancelToken: source.token
      });
      return data;
    },
    // Delete User
    deleteUsers: function(id) {
      return axios.delete(`/api/users/${id}`)
    },
    // Post Report 
    postReport: function(postInfo) {
        return axios.post("/api/reports", postInfo)
    },
    // Edit Report
    putReport: function(id, body) {
        return axios.put(`/api/reports/byid/${id}`, body)
    },
    // removes member from franchise staff (without deleting the actual user)
    // note that this is a put route....
    removeFranchiseMember: async function(id, body) {
      return await axios.put(`/api/removestaff/${id}`, body);
    },
    // Delete System
    deleteSystem: function(id) {
        return axios.delete(`/api/systems/${id}`)
    },
    // cancel request
    cancelRequest: function() {
      source.cancel("API request cancelled.");
      // after token is cancelled, a new CancelToken is created so that each request
      // has a different token.
      CancelToken = axios.CancelToken;
      source = CancelToken.source();
      return true;
    },
}