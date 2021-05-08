import axios from 'axios';

const publicService = axios.create({
  baseURL: 'https://mern-auth.jakepeterson.dev/api'
});

export { publicService };
