// axiosInstance.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
const AUTH_API_URL: string = process.env.EXPO_PUBLIC_AUTH_API_URL || "";
// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: AUTH_API_URL, // Replace with your backend URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
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
        // Detect network errors
        if (!error.response) {
            // Handle network error
            Alert.alert('Network Error', 'Please check your internet connection and try again.');
        } else if (error.response.status === 401) {
            // Handle unauthorized errors, e.g., redirect to login
            console.log('Unauthorized, redirecting to login...');
            Alert.alert('Unauthorized', 'Session expired. Please log in again.');
            const navigation = useNavigation();
           return navigation.navigate('SignIn'); // Replace 'SignIn' with your login screen route name
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
