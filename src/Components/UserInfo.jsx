import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as myapi from "./Myapi";
import UserForm from './UserForm';

const UserInfo = () => {
    const [isEditing, setIsEditing] = useState(false);
    const handleEditing = () => {
        setIsEditing(!isEditing);
    };
    const { id } = useParams();
    const { data: user, isLoading, isError, error } = useQuery({
        queryKey: ['user', id],
        queryFn: () => myapi.getUser(id),
        staleTime: 5000,
        refetchInterval: 10000,
    });

    if (isLoading) {
        return <p>Loading...</p>
    };
    if (isError) {
        return <p>{error.message}</p>
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className='text-2xl mb-4'><b>{user.name} Info</b></h2>
            <div>
                <ul>
                    <div>
                        <p className="mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
                        <p className="mb-2"><span className="font-semibold">Age:</span> {user.age}</p>
                        <p className="mb-2"><span className="font-semibold">Role:</span> {user.role}</p>
                        <p className="mb-2"><span className="font-semibold">Address:</span> {user.address}</p>
                    </div>
                </ul>
            </div>
            {
                isEditing ?
                    (<div className="mt-4"><button onClick={handleEditing} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Cancel</button><UserForm user={user} setIsEditing={setIsEditing} /></div>) :
                    (<button onClick={handleEditing} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">Edit</button>)
            }
            <p className="mt-4"><Link to="/" className="text-gray-600">Go Back</Link></p>
        </div>
    )
}

export default UserInfo;
