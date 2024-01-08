import { AxiosError } from 'axios';
import { apiInstance } from './instance';

/* 
@ROUTE : /user 
*/
export const getUser = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get('/user', {
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/update 
*/
export const updateUser = async ({ name, email, host, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!name) throw new Error('Name must be submitted!');
        if (!email) throw new Error('Email must be submitted!');
        if (!host) throw new Error('Host must be submitted!');

        const response = await apiInstance.put(
            '/user/update',
            {
                name,
                email,
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/updateImage 
*/
export const updateUserImage = async ({ image, token }) => {
    try {
        if (!image) throw new Error('Image must be submitted!');
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.put(
            '/user/updateImage',
            {
                image,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/kelas/all 
*/
export const getAllClassApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get('/user/kelas/all', {
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/kelas/${id} 
*/
export const getClassById = async ({ id, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id) throw new Error('id must be submitted!');

        const response = await apiInstance.get(`/user/kelas/${id}`, {
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/kelas/${id} 
*/
export const getClassByLevel = async ({ id, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id) throw new Error('id must be submitted!');

        const response = await apiInstance.get(`/user/kelasByLevel/${id}`, {
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/materi/${id} 
*/
export const getMateriById = async ({ id, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id) throw new Error('id must be submitted!');

        const response = await apiInstance.get(`/user/materi/${id}`, {
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/quiz/${id}
*/
export const getQuiz = async ({ id, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id) throw new Error('id must be submitted!');

        const response = await apiInstance.get(`/user/quiz/${id}`, {
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/history/getOrCreate
*/
export const getOrCreateHistory = async ({ id_kelas, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');

        const response = await apiInstance.post(
            `/user/history/getOrCreate`,
            {
                id_kelas,
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/history/createOrUpdate
*/
export const createOrUpdateHistory = async ({ id_kelas, id_materi, playback, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');
        if (!id_materi) throw new Error('id materi must be submitted!');
        if (!playback) throw new Error('playback must be submitted!');

        const response = await apiInstance.post(
            `/user/history/createOrUpdate`,
            {
                id_kelas,
                id_materi,
                playback,
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/answer
*/
export const getAnswerUser = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get(`/user/answer`, {
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
        throw new Error(error.message); //throw custom error
    }
};

/* 
@ROUTE : /user/answer/send
*/
export const sendAnswer = async ({ id_answer, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_answer) throw new Error('id answer must be submitted!');

        const response = await apiInstance.post(
            `/user/answer/send`,
            {
                id_answer,
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
        throw new Error(error.message); //throw custom error
    }
};
