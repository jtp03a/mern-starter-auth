import axios from 'axios';

const publicService = axios.create({
  baseURL: '/api'
});

export { publicService };
