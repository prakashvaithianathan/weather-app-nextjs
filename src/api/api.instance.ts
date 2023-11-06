import axios, { AxiosInstance } from 'axios';

// Create a function that returns an Axios instance with your desired configuration
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Your API base URL
        timeout: 10000, // Request timeout in milliseconds
        headers: {
            'Content-Type': 'application/json', // Example headers
        },
    });

    // You can also add request interceptors, response interceptors, and other configurations here.

    return instance;
};

// Export the Axios instance
export const axiosInstance = createAxiosInstance();