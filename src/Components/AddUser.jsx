import React, { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as myapi from "./Myapi";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        role: "",
        age: "",
        address: ""
    });

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { isLoading, mutate } = useMutation({
        mutationFn: myapi.addUser,
        onSuccess: (user) => {
            setNewUser(user);
            queryClient.invalidateQueries('users');
            navigate("/");
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevData => ({ ...prevData, [name]: value }));
    };

    if (isLoading) {
        return <p>Adding new user...</p>
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(newUser);
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className='text-2xl mb-4'><b>Add New User</b></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor='name' className="block">Name:</label>
                    <input type='text' id='name' name='name' value={newUser.name} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" required/>
                </div>
                <div>
                    <label htmlFor='age' className="block">Age:</label>
                    <input type='number' id='age' name='age' value={newUser.age} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" required/>
                </div>
                <div>
                    <label htmlFor='role' className="block">Role:</label>
                    <input type='text' id='role' name='role' value={newUser.role} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" required/>
                </div>
                <div>
                    <label htmlFor='address' className="block">Address:</label>
                    <input type='text' id='details' name='address' value={newUser.address} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" required/>
                </div>
                <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Add User</button>
            </form>
            <div className="mt-4"><Link to="/" className="text-blue-500">User List</Link></div>
        </div>
    )
}

export default AddUser;
