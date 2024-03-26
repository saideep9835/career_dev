
import axios from 'axios';

const api = () => {
    const token = localStorage.getItem('desologinkey');
    return axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            Authorization: token
        }
    });
};


// const api = axios.create({
//     const token = localStorage.getItem('desologinkey');
//     baseURL: 'http://localhost:8000',
//     headers: {
//         Authorization: `Bearer ${token}`
//     }
// });

export default api;