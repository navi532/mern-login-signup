import axios from 'axios'
const API_URL = '/api/dashboard/'

// Get user locations
const getLocations = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}


const locationService = {
  getLocations,
}

export default locationService
