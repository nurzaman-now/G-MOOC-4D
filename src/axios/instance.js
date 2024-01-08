import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: 'https://nurz.site/api',
    // baseURL: 'https://be.gmooc4d.id/api',
    withCredentials: true,
});

export const sanctumApiInstance = axios.create({
    baseURL: 'https://nurz.site/sanctum/csrf-cookie',
    // baseURL: 'https://be.gmooc4d.id/sanctum/csrf-cookie',
    withCredentials: true,
});
