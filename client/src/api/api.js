import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchJobs = () => API.get('/jobs');
export const fetchImports = () => API.get('/imports');
