import { AxiosError } from 'axios';
import { apiInstance } from './instance';

/* 
@ROUTE : /admin/user 
*/
export const adminGetAllUserApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get('/admin/user/all', {
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
@ROUTE : /admin/user/progress
*/
export const adminGetAllProgressUserApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        console.log(token);

        const response = await apiInstance.get('/admin/user/progress', {
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
@ROUTE : /admin/levelKelas/all
*/
export const adminGetAllLevelKelasApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get('/admin/levelKelas/all', {
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
@ROUTE : /admin/kelasByLevel/id
*/
export const adminGetClassByLevel = async ({ id, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id) throw new Error('id must be submitted!');

        const response = await apiInstance.get(`/admin/levelKelas/${id}`, {
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
@ROUTE : /admin/kelas/create
*/
export const adminCreateClassApi = async ({ id_level, image, description, name, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_level) throw new Error('id level must be submitted!');
        if (!image) throw new Error('image must be submitted!');
        if (!name) throw new Error('name kelas must be submitted!');

        const response = await apiInstance.post(
            '/admin/kelas/create',
            {
                id_level,
                image,
                name,
                description,
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
@ROUTE : /admin/kelas/all
*/
export const adminGetAllClassApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get('/admin/kelas/all', {
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
@ROUTE : /admin/kelas/${id}
*/
export const adminGetClassByIdApi = async ({ id_kelas, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');

        const response = await apiInstance.get(`/admin/kelas/${id_kelas}`, {
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

// api / admin / kelasSearch ? name

/* 
@ROUTE : /admin/kelasSearch?name=${className}
*/
export const adminGetClassByQuery = async ({ query, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!query) throw new Error('query must be submitted!');

        const response = await apiInstance.get(`/admin/kelasSearch?name=${query}`, {
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
@ROUTE : /admin/kelas/update/${id_kelas}
*/
export const adminUpdateClassApi = async ({ id_kelas, id_level, name, token, image, description }) => {
    try {
        // if (!token) throw new Error('Token must be submitted!');
        // if (!id_kelas) throw new Error('id kelas must be submitted!');
        // if (!name) throw new Error('name kelas must be submitted!');

        const response = await apiInstance.post(
            `/admin/kelas/update/${id_kelas}`,
            {
                id_level,
                name,
                description,
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
@ROUTE : /admin/kelas/update_image/${id_kelas}
*/
export const adminUpdateImageClassApi = async ({ id_kelas, image, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');
        if (!image) throw new Error('name kelas must be submitted!');

        const response = await apiInstance.post(
            `/admin/kelas/update_image/${id_kelas}`,
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
@ROUTE : /api/admin/kelas/delete/${id_kelas}
*/
export const adminDeleteClassApi = async ({ id_kelas, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');

        const response = await apiInstance.delete(`/admin/kelas/delete/${id_kelas}`, {
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
@ROUTE : /api/admin/materi/create
*/
export const adminCreateMateriApi = async ({ id_kelas, name, materi, url, poin, durasi, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');
        if (!name) throw new Error('kelas name must be submitted!');
        if (!materi) throw new Error('materi must be submitted!');
        if (!url) throw new Error('url must be submitted!');

        const response = await apiInstance.post(
            `/admin/materi/create`,
            {
                id_kelas,
                name,
                materi,
                url,
                durasi,
                poin,
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
@ROUTE : /api/admin/materi/all
*/
export const adminGetAllMateriApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get(`/admin/materi/all`, {
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
@ROUTE : /admin/materiSearch?name=${query}
*/
export const adminGetMateriByQuery = async ({ query, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!query) throw new Error('query must be submitted!');

        const response = await apiInstance.get(`/admin/materiSearch?name=${query}`, {
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
@ROUTE : /api/admin/materi/${id_materi}
*/
export const adminGetMateriByIdApi = async ({ id_materi, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_materi) throw new Error('id materi must be submitted!');

        const response = await apiInstance.get(`/admin/materi/${id_materi}`, {
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
@ROUTE : /admin/materi/update/${id_materi}
*/
export const adminUpdateMateriApi = async ({ id_materi, id_kelas, name, token, url, durasi, materi, poin }) => {
    try {
        // if (!token) throw new Error('Token must be submitted!');
        // if (!id_materi) throw new Error('id materi must be submitted!');
        // if (!id_kelas) throw new Error('id kelas must be submitted!');
        // if (!name) throw new Error('materi name must be submitted!');

        const response = await apiInstance.put(
            `/admin/materi/update/${id_materi}`,
            { name, id_kelas, url, durasi, materi, poin },
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
@ROUTE : /admin/materi/delete/${id_materi}
*/
export const adminDeleteMateriApi = async ({ id_materi, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_materi) throw new Error('id materi must be submitted!');

        const response = await apiInstance.delete(`/admin/materi/delete/${id_materi}`, {
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
@ROUTE : /admin/history/all
*/
export const adminGetHistoryApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get(`/admin/history/all`, {
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
@ROUTE : /admin/history/create
*/
export const adminCreateHistoryApi = async ({ id_user, id_materi, id_kelas, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_user) throw new Error('id user must be submitted!');
        if (!id_materi) throw new Error('id materi must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');

        const response = await apiInstance.post(
            `/admin/history/create`,
            {
                id_user,
                id_materi,
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
@ROUTE : /admin/history/delete/${id_history}
*/
export const adminDeleteHistoryApi = async ({ id_history, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_history) throw new Error('id history must be submitted!');

        const response = await apiInstance.delete(`/admin/history/delete/${id_history}`, {
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
@ROUTE : /admin/quiz/all
*/
export const adminGetAllQuizApi = async ({ token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.get(`/admin/quiz/all`, {
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
@ROUTE : /admin/quizSearch?name=${query}
*/
export const adminGetQuizByQuery = async ({ query, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!query) throw new Error('query must be submitted!');

        const response = await apiInstance.get(`/admin/quizSearch?name=${query}`, {
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
@ROUTE : /admin/quiz/${id_quiz}
*/
export const adminGetQuizByIdApi = async ({ id_quiz, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_quiz) throw new Error('id quiz must be submitted!');

        const response = await apiInstance.get(`/admin/quiz/${id_quiz}`, {
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
@ROUTE : /admin/quizByKelas/${id_kelas}
*/
export const adminGetQuizByKelas = async ({ id_kelas, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id quiz must be submitted!');

        const response = await apiInstance.get(`/admin/quiz/${id_kelas}`, {
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
@ROUTE : /admin/quiz/create
*/
export const adminCreateQuizApi = async ({ id_kelas, question, true_answer, option_A, option_B, option_C, token }) => {
    try {
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id quiz must be submitted!');
        if (!question) throw new Error('question must be submitted!');
        if (!true_answer) throw new Error('true_answer must be submitted!');
        if (!option_A) throw new Error('option_A must be submitted!');
        if (!option_B) throw new Error('option_B must be submitted!');
        if (!option_C) throw new Error('option_C must be submitted!');

        const response = await apiInstance.post(
            `/admin/quiz/create`,
            {
                id_kelas,
                question,
                true_answer,
                option_A,
                option_B,
                option_C,
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
@ROUTE : /admin/quiz/update/${id_quiz}
*/
export const adminUpdateQuizApi = async ({ id_quiz, id_kelas, question, true_answer, option_A, option_B, option_C, token }) => {
    try {
        if (!id_quiz) throw new Error('id quiz must be submitted!');
        if (!token) throw new Error('Token must be submitted!');
        if (!id_kelas) throw new Error('id kelas must be submitted!');
        if (!question) throw new Error('question must be submitted!');
        if (!true_answer) throw new Error('true_answer must be submitted!');
        if (!option_A) throw new Error('option_A must be submitted!');
        if (!option_B) throw new Error('option_B must be submitted!');
        if (!option_C) throw new Error('option_C must be submitted!');

        const response = await apiInstance.put(
            `/admin/quiz/update/${id_quiz}`,
            {
                id_kelas,
                question,
                true_answer,
                option_A,
                option_B,
                option_C,
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
@ROUTE : /admin/quiz/delete/${id_quiz}
*/
export const adminDeleteQuizApi = async ({ id_quiz, token }) => {
    try {
        if (!id_quiz) throw new Error('id quiz must be submitted!');
        if (!token) throw new Error('Token must be submitted!');

        const response = await apiInstance.delete(
            `/admin/quiz/delete/${id_quiz}`,

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
