import axios from 'axios';

export const baseUrl = process.env.API_URL || '';

export const apiClient = axios.create({ baseURL: baseUrl });