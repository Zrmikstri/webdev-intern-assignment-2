import * as React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";

import api from "./api.js";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    api.post("/api/auth/logout/")
      .then(() => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
};

function RegisterAndLogout() {
  localStorage.clear();

  return <Register />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;