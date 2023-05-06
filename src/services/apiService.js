import axios from '../utils/axiosCustomize';

const postCreateNewUser = (email, password, username, role, image) => {
    //Submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, username, role, image) => {
    //Submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', {data: {id}});
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', {email, password, delay: 5000});
}

const postSignUp = (email, password, username) => {
    return axios.post('api/v1/register', {email, password, username});
}

export {postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, getUserWithPaginate, postLogin, postSignUp}