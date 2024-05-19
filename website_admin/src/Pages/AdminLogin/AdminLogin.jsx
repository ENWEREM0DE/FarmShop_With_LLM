import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./AdminAuth.css";

const AdminLogin = ({ setAuth }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/adminLogin", { email, password });
            console.log("log in success")
            localStorage.setItem("adminToken", res.data.token);
            setAuth(true);
            navigate("/admin");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="auth-container">
            <h2>Admin Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>

                <p className="loginsignup-login">Don't have an account? <Link to="/admin/signup">Create Account</Link></p>

            </form>
        </div>
    );
};

export default AdminLogin;
