import axios from "axios";
import { decode } from "jsonwebtoken";
import { constants } from "../../config";
import { api, success, error } from "./services.common";

export const checkLoginAPI = () => {
  let token = localStorage.getItem(constants.KEY_AUTH_TOKEN)
  if (token === undefined || token === null) {
    return {
      loggedIn: false
    };
  }
  else {
    // check if token is expired
    let jsonToken = decode(token)
    if (jsonToken.exp < (new Date().getTime() + 1) / 1000) {
      return {
        loggedIn: false
      };
    }
    else {
      return {
        loggedIn: true,
        userName: localStorage.getItem(constants.KEY_USER_NAME),
        role: localStorage.getItem(constants.KEY_USER_ROLE),
        email: localStorage.getItem(constants.KEY_USER_EMAIL)
      };
    }
  }
}

export const loginAuthenticationAPI = async (username, password) => {
  try {
    let response = await axios.post(`${api}authenticate/login`, { username, password });
    if (response.data.httpStatus === 200 && response.data.data.user.isActive === true) {
      const credentials = response.data.data;

      if (credentials.role !== "Admin") {
        return error("Sorry, You don't have sufficient privilege to login.");
      }

      // save token
      localStorage.setItem(constants.KEY_AUTH_TOKEN, credentials.token);
      localStorage.setItem(constants.KEY_USER_NAME, credentials.username);
      localStorage.setItem(constants.KEY_USER_EMAIL, credentials.email);
      localStorage.setItem(constants.KEY_USER_ROLE, credentials.role);
      credentials.userName = credentials.username
  
      return success(credentials);
    }
    else if (response.data.data.user.isActive === false) {
      return error('User deactivated. Please contact another admin user to reactivate.');
    }
    else {
      return error(response.data.statusMessage);
    }
  }
  catch (e) {
    console.log(e);
    if (e.response.data) {
      return error(e.response.data.statusMessage);
    }
    return error(e);
  }
};

export const logoutUserAPI = () => {
  localStorage.clear();
  return true;
}