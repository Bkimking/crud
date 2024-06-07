// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        age: '',
        gender: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/get_user/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`http://localhost:5000/edit_user/${id}`, data)
            .then((res) => {
                navigate("/");
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className='container-fluid vh-100 vw-100 bg-primary'>
            <h1>Edit User {id}</h1>
            <div className='d-flex justify-content-end'>
                <Link to={'/'} className='btn btn-success'>Back</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group my-3'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type="text"
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type="email"
                        name='email'
                        value={data.email}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='age'>Age</label>
                    <input
                        type="number"
                        name='age'
                        value={data.age}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <div className='form-group my-3'>
                    <label htmlFor='gender'>Gender</label>
                    <div>
                        <input
                            type="radio"
                            name='gender'
                            value="Male"
                            checked={data.gender === "Male"}
                            onChange={handleChange}
                        /> Male
                        <input
                            type="radio"
                            name='gender'
                            value="Female"
                            checked={data.gender === "Female"}
                            onChange={handleChange}
                        /> Female
                        <input
                            type="radio"
                            name='gender'
                            value="Others"
                            checked={data.gender === "Others"}
                            onChange={handleChange}
                        /> Others
                    </div>
                </div>
                <div className='form-group my-3'>
                    <button type='submit' className='btn btn-primary'>Save</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
