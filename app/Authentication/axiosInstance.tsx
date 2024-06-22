// axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// Create an instance of Axios

const axiosInstance = axios.create({
    baseURL: 'http://192.168.43.159:5000', // Replace with your backend URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const token =await AsyncStorage.getItem('token'); // Get token from localStorage
       
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        // Handle request error here
       
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => { 
        

        // Any status code within the range of 2xx causes this function to trigger
        return response;
    },
    (error) => { 
       
         
        // Any status codes outside the range of 2xx cause this function to trigger
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors, e.g., redirect to login
            console.log('Unauthorized, redirecting to login...');
           
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
