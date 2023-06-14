import axios from "axios"
import {toast} from "react-toastify"

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, {withCredentials: true})
        if (response.statusText === "OK") {
            toast.success("User Registered Successfully")
        }
        return response.data
    }
    catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString();
        toast.error(message);
    }
};


export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        userData
      );
      if (response.statusText === "OK") {
        toast.success("Login Successful...");
      }
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
};


export const logoutUser = async () => {
    try {
      await axios.get(`${BACKEND_URL}/api/users/logout`);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  export const getLoginStatus = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  export const getUser = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/getuser`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };



  export const getUsersDestinations = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/getusers`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  export const getUsersWithSimilarPreferences = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/similarusers`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  export const getNotCommonDestinations = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/getnotcommondestinations`);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  export const updateUser = async (formData) => {
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/api/users/updateuser`,
        formData
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };


  

