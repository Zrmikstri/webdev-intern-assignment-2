import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api';

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();


        await api.post("/api/auth/register/", { username, email, password1, password2 })
            .then((res) => {
                localStorage.setItem("TOKEN", res.data.key);
            })
            .catch((err) => {
                alert(JSON.stringify(err.response.data));
            });

        await api.get("/api/auth/user/")
            .then((res) => {
                localStorage.setItem("USER", JSON.stringify(res.data));
            })
            .catch((err) => {
                alert(err);
            });

        alert("Check your email to activate your account");


    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Register</h1>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <br />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <br />
            <input
                type="password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Password"
            />
            <br />
            <input
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Confirm password"
            />
            <br />
            <button className="form-button" type="submit">
                Register
            </button>
        </form>
    );
}

export default Register;