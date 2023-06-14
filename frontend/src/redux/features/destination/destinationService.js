import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/destinations`;

// Create New Product
const createDestination = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all pdestinations
const getDestinations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};


const destinationService = {
  createDestination,
  getDestinations,
};

export default destinationService;