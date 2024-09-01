import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the backend to register the user
            const response = await axios.post('http://localhost:3001/register', {
                username,
                password,
            });

            setMessage('User registered successfully! Please log in.');
        } catch (error) {
            setMessage('Registration failed. Please try again.');
            console.error(error);
        }
    };

    return (
        <div className="flexBoxColumnGrow landing-page background column-center">
            <div className="flexBowColumnGrow column-center">
                <h1 className="greeting-colour">Register</h1>
                <form id="register" onSubmit={handleRegister} className="flexBoxColumnGrow column-center">
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
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    )
}