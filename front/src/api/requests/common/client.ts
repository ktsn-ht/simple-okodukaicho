import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
  })
);
