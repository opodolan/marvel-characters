import axios from 'axios';
import md5 from 'md5';

// Access the environment variables
const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getCharacters = async (params = {}, limit = 50) => {
  const ts = new Date().getTime();
  const hash = getHash(ts);

  try {
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: {
        apikey: PUBLIC_KEY,
        hash,
        ts,
        ...params,
        limit
      },
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (id) => {
  const ts = new Date().getTime();
  const hash = getHash(ts);

  try {
    const response = await axios.get(`${BASE_URL}/characters/${id}`, {
      params: {
        apikey: PUBLIC_KEY,
        hash,
        ts
      },
    });
    
    return response.data.data.results[0];
  } catch (error) {
    console.error('Error fetching character by ID:', error);
    throw error;
  }
};

export const getComicsByCharacterId = async (id, limit = 20) => {
  const ts = new Date().getTime();
  const hash = getHash(ts);

  try {
    const response = await axios.get(`${BASE_URL}/characters/${id}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        hash,
        ts
      },
    });
    
    return response.data.data.results;
  } catch (error) {
    console.error('Error fetching comics by character ID:', error);
    throw error;
  }
};

const getHash = (ts) => {
  return md5(ts + PRIVATE_KEY + PUBLIC_KEY);
};