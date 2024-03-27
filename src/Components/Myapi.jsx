import axios from "axios";

const myapi = axios.create({
    baseURL: ("http://localhost:3000"),
});


export const getUsers = async() => {
    return myapi.get("/users").then(res => res.data);
};

export const getUser = async(id) => {
    return myapi.get(`/users/${id}`).then(res => res.data);
};

export const updateUser = async({id, ...updatedUser}) => {
    return myapi.put(`users/${id}`, updatedUser).then(res => res.data);
};

export const addUser = async(user) => {
    return myapi.post("/users", user).then(res => res.data)
};

export const removeUser = async(id) => {
    return myapi.delete(`users/${id}`).then(res => res.data);
};
