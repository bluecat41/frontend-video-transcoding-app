import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem('authtoken', token);
            console.log(token);
            navigate("/");
            window.location.reload(false);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized response
                setMessage('Unauthorized access. Please try again.');
            } else {
                // Handle other errors
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="flexBoxColumnGrow background login-page column-center">
            <h1 className="greeting-colour">Login</h1>
            <form onSubmit={handleSubmit} id="login" className="flexBoxColumnGrow column-center">
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="login-form-button" type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}