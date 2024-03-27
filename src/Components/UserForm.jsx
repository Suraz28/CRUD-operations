import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import * as myapi from "./Myapi";
import { useQueryClient } from "@tanstack/react-query";

const UserForm = ({ user, setIsEditing }) => {
    const [field, setField] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField((prevField) => ({ ...prevField, [name]: value }))
    };

    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation({
        mutationFn: myapi.updateUser,
        onSuccess: (updatedUser) => {
            setField(updatedUser);
            queryClient.invalidateQueries(['user', user.id]);
            setIsEditing(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(field);
    }

    if (isLoading) {
        return <p>Updating data...</p>
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-6 bg-white rounded-lg shadow-md">
            <h2 className='text-2xl mb-4'><b>User Form</b></h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor='name' className="block">Name:</label>
                    <input type='text' id='name' name="name" value={field.name} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor='age' className="block">Age:</label>
                    <input type='number' id='age' name="age" value={field.age} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor='role' className="block">Role:</label>
                    <input type='text' id='role' name="role" value={field.role} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" />
                </div>
                <div>
                    <label htmlFor='address' className="block">Address:</label>
                    <input type='text' id='address' name="address" value={field.address} onChange={(e) => handleChange(e)} className="w-full border rounded-md p-2" />
                </div>
                <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Update</button>
            </form>
        </div>
    )
}

export default UserForm;
