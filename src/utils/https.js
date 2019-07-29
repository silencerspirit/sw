import axios from 'axios';

const HTTPS = axios.create({
  baseURL: 'https://swapi.co/api/',
});

export default HTTPS;
