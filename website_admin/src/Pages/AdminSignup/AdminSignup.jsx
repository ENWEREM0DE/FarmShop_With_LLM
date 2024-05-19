import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./AdminAuth.css";

const AdminSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {

            await axios.post("http://localhost:4000/adminLogin", { email, password });
            navigate("/admin/login");
        } catch (err) {
            console.log(err)
            setError("Error signing up. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h2>Admin Signup</h2>
            <form onSubmit={handleSignup}>
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
                <button type="submit">Signup</button>
                <p className="loginsignup-login">Already have an account? <Link to="/admin/login">Login</Link></p>

            </form>
        </div>
    );
};

export default AdminSignup;
