// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
    const [value, setValue] = useState({
        name: "",
        email: "",
        age: "",
        gender: ""
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        axios.post('http://localhost:5000/add_user', value)
            .then((res) => {
                navigate("/");
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='container-fluid vh-100 vw-100 bg-primary'>
            <div className='row'>
                <h3>Add Student</h3>
                <div className='d-flex justify-content-end'>
                    <Link to={'/'} className='btn btn-success'>Home</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type="text"
                            name='name'
                            value={value.name}
                            onChange={(e) => setValue({ ...value, name: e.target.value })}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            name='email'
                            value={value.email}
                            onChange={(e) => setValue({ ...value, email: e.target.value })}
                            className='form-control'
                        />
                    </div>
                    <div className='form-group my-3'>
                        <label htmlFor='age'>Age</label>
                        <input
                            type="number"
                            name='age'
                            value={value.age}
                            onChange={(e) => setValue({ ...value, age: e.target.value })}
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
                                checked={value.gender === "Male"}
                                onChange={(e) => setValue({ ...value, gender: e.target.value })}
                            /> Male
                            <input
                                type="radio"
                                name='gender'
                                value="Female"
                                checked={value.gender === "Female"}
                                onChange={(e) => setValue({ ...value, gender: e.target.value })}
                            /> Female
                            <input
                                type="radio"
                                name='gender'
                                value="Others"
                                checked={value.gender === "Others"}
                                onChange={(e) => setValue({ ...value, gender: e.target.value })}
                            /> Others
                        </div>
                    </div>
                    <div className='form-group my-3'>
                        <button type='submit' className='btn btn-primary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Create;
