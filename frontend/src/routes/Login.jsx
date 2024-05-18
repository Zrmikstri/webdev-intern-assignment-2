import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/api/auth/login/", { username, password })
                .then((res) => {
                    localStorage.setItem("TOKEN", res.data.key);
                });

            await api.get("/api/auth/user/")
                .then((res) => {
                    localStorage.setItem("USER", JSON.stringify(res.data));
                });


            navigate("/");

        } catch (error) {
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Login</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <br />
            <button className="form-button" type="submit">
                Login
            </button>
        </form>
    );
}

export default Login;