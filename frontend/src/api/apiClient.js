import axios from 'axios';
import config from '../config';


const apiClient = axios.create({
    baseURL: `${config.API_BASE_URL}/api/reviews`, 
});


apiClient.interceptors.request.use(
    (config) => {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        
        if (username && password) {
            const encodedCredentials = btoa(`${username}:${password}`);
            config.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
