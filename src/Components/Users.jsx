import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as myapi from "./Myapi";
import { Link } from "react-router-dom";

const Users = () => {
    const queryClient = useQueryClient();

    const [usersdetails, setUsersDetails] = useState(false);

    const { data: users, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: myapi.getUsers,
        staleTime: 5000,
        refetchInterval: 10000,
    });

    useEffect(() => {
        if (users && users.length === 0) {
            setUsersDetails(true);
        } else {
            setUsersDetails(false);
        }
    }, [users]);

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (isError) {
        return <p>{error.message}</p>
    }

    const handleRemove = (id) => {
        myapi.removeUser(id).then(() => {
            queryClient.invalidateQueries("users");
        });
    };
    

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
            <h3 className='text-2xl mb-4'><b>Users List</b></h3>
            {usersdetails ? (
                <p>No users in the list.</p>
            ) : (
                <ul>
                    <div>
                        {users.map((user) => (
                            <li key={user.id} className="flex justify-between items-center mb-2">
                                {user.name}
                                <div className='flex gap-2'>
                                    <Link to={`/users/user/${user.id}`} className="text-gray-700"><button type='submit' className="bg-gray-700 text-white px-4 py-1 rounded-md hover:bg-gray-800">View</button></Link>
                                    <button onClick={() => handleRemove(user.id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Remove</button>
                                </div>
                            </li>
                        ))}
                    </div>
                </ul>
            )}
            <p className="mt-4"><Link to={"/users/add"} className="text-blue-500">Add User</Link></p>
        </div>
    )
}

export default Users;
