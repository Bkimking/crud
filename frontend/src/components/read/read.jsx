// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/get_user/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container-fluid vh-100 vw-100 bg-primary'>
            <h1>User {id}</h1>
            <div className='d-flex justify-content-end'>
                <Link to={'/'} className='btn btn-success'>Back</Link>
            </div>
            <ul className='list-group'>
                <li className='list-group-item'>
                    <b>ID:</b> {data.id}
                </li>
                <li className='list-group-item'>
                    <b>Name:</b> {data.name}
                </li>
                <li className='list-group-item'>
                    <b>Email:</b> {data.email}
                </li>
                <li className='list-group-item'>
                    <b>Age:</b> {data.age}
                </li>
                <li className='list-group-item'>
                    <b>Gender:</b> {data.gender}
                </li>
            </ul>
        </div>
    );
}

export default Read;
