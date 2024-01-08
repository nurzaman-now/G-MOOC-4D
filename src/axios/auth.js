import axios, { AxiosError } from 'axios';
import { apiInstance, sanctumApiInstance } from './instance';

/* 
@ROUTE : /register 
*/
export const registerApi = async ({ name, email, password, konfirmasi_password, host }) => {
    try {
        if ((!name && !email && !password && !konfirmasi_password) || !host) throw new Error('Please insert all input form!');
        if (!password) throw new Error('Password must be submitted!');
        if (!konfirmasi_password) throw new Error('Konfirmasi Password must be submitted!');
        if (!password !== !konfirmasi_password) throw new Error('Password & Konfirmasi Password must same!');
        if (!name) throw new Error('Name must be submitted!');
        if (!email) throw new Error('Email must be submitted!');
        if (!host) throw new Error('Host must be submitted!');

        await sanctumApiInstance.get();
        const response = await apiInstance.post(
            '/register',
            {
                name,
                email,
                password,
                konfirmasi_password,
                host,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // console.log(error?.response); //Uncomment for debugging
            const errorMsg = error?.response?.data?.metadata?.message;
            throw new Error(errorMsg);
        }
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /login 
*/
export const loginApi = async ({ email, password }) => {
    try {
        if (!email && !password) throw new Error('Email & Password must be submitted!');
        if (!email) throw new Error('Email must be submitted!');
        if (!password) throw new Error('Password must be submitted!');

        const response = await apiInstance.post(
            '/login',
            {
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // console.log(error?.response); //Uncomment for debugging
            const errorMsg = error?.response?.data?.metadata?.message;
            throw new Error(errorMsg);
        }
        throw new Error(error.message);
    }
};

/* 
@ROUTE : /logout 
*/
export const logoutApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        const response = await apiInstance.get('/logout', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // console.log(error?.response); //Uncomment for debugging
            const errorMsg = error?.response?.data?.metadata?.message;
            throw new Error(errorMsg);
        }
        throw new Error(error.message);
    }
};

/* 
@ROUTE : /verify 
*/
export const verifyApi = async ({ url }) => {
    try {
        if (!url) throw new Error('url must be submitted!');
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // console.log(error?.response); //Uncomment for debugging
            const errorMsg = error?.response?.data?.metadata?.message;
            throw new Error(errorMsg);
        }
        throw new Error(error.message);
    }
};

/* 
@ROUTE : /email/verification-notification
*/
export const resendVerifyApi = async ({ token, host }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!host) throw new Error('Host must be submitted!');

        const response = await apiInstance.post(
            '/email/verification-notification',
            {
                host,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // console.log(error?.response); //Uncomment for debugging
            const errorMsg = error?.response?.data?.metadata?.message;
            throw new Error(errorMsg);
        }
        throw new Error(error.message);
    }
};

/* 
@ROUTE : '/forgot-password'
*/
export const forgotPasswordApi = async ({ email, host }) => {
    try {
        if (!email) throw new Error('Email must be submitted!');
        if (!host) throw new Error('Host must be submitted!');

        const response = await apiInstance.post(
            '/forgot-password',
            {
                email,
                host: `${host}/reset-password`,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            // console.log(error?.response); //Uncomment for debugging
            const errorMsg = error?.response?.data?.metadata?.message;
            throw new Error(errorMsg);
        }
        throw new Error(error.message);
    }
};

/* 
@ROUTE : '/reset-password'
*/
export const resetPasswordApi = async ({ email, password, password_confirmation, token }) => {
    try {
        if (!password) throw new Error('Password must be submitted!');
        if (!password_confirmation) throw new Error('Password Confirmation must be submitted!');
        if (!password !== !password_confirmation) throw new Error('Password & Password Confirmation must same!');
        if (!email) throw new Error('Email must be submitted!');
        if (!token) throw new Error('token must be submitted!');
        if (!email && !password && !password_confirmation && !token) throw new Error('Please insert all input form!');

        const response = await apiInstance.post(
            '/reset-password',
            {
                email,
                password,
                password_confirmation,
                token,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error?.response); //Uncomment for debugging
            const errorMsg = error?.response?.data?.metadata?.message;
            throw new Error(errorMsg);
        }
        throw new Error(error.message);
    }
};
