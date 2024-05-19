import React, { useEffect, useState } from "react";
import "./UserList.css";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/users')
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="user-list">
            <h1>User List</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date Joined</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.date).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
