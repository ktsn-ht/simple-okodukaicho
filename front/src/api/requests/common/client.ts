import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

export const client = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_API_ENDPOINT,
  })
);
