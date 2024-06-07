// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/users')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/delete_user/${id}`)
            .then(() => {
                window.location.reload(); // Refresh the page after deletion
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='container-fluid vh-100 vw-100 bg-primary'>
            <h3>Users</h3>
            <div className='d-flex justify-content-end'>
                <Link to={'/create'} className='btn btn-success'>Add user</Link>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <Link className='btn mx-2 btn-success' to={`/edit/${user.id}`} >Edit</Link>
                                    <Link className='btn mx-2 btn-info' to={`/read/${user.id}`} >Read</Link>
                                    <button className='btn mx-2 btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Home;
