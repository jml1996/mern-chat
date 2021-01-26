import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
        baseURL: "https://mern-chat-login-server.herokuapp.com",
        headers: {
            Authorization: token
        }
    })
}
