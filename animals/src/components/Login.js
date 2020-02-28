import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import { axiosWithAuth } from '../utils/axiosWithAuth';

export default function Login(props) {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const history = useHistory();

    const handleChange = e => {
        e.preventDefault();
        setLogin({...login, [e.target.name]: e.target.value})
       
    }


    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post('/login', login)
            .then(res => {
                console.log(res)
                window.localStorage.setItem('token', res.data.payload)
                history.push('/creatures');
            })
            .catch(err => console.log('There was an error', err.response))
    }

    return (
        <div>
            <h1>Welcome to the Safari App!</h1>
            <h2>I can't show you more until you log in. Please build out a login.</h2>
            <form className="forms-style" onSubmit={handleSubmit}>
                <label htmlFor='username'>
                    <input
                        type="text"
                        name="username"
                        label="username"
                        value={login.username}
                        onChange={handleChange}
                        className="input"
                    />     
                </label>
                <label htmlFor='password'>
                    <input
                        type="text"
                        name="password"
                        label="password"
                        value={login.password}
                        onChange={handleChange}
                        className="input"
                    />     
                </label>
                <button className="start">Start</button>
            </form>
        </div>
    )
}