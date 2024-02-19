import axios from 'axios';
const baseUrl = 'http://localhost:3000/persons';

const getAll = () => {
    return axios.get(baseUrl)
};

const add = (newAddress) => {
    return axios.post(baseUrl, newAddress)
};

const update = (id, newAddress) => {
    return axios.put(`${baseUrl}/${id}`, newAddress)
};

const deleteAddress = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
};


export default { getAll, add, update, deleteAddress };