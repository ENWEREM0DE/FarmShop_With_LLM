import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Admin from "./Pages/Admin/Admin.jsx";
import AdminLogin from "./Pages/AdminLogin/AdminLogin.jsx";
import AdminSignup from "./Pages/AdminSignup/AdminSignup.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Footer from "./Components/Footer/Footer.jsx";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route
                    path="/admin/*"
                    element={isAuthenticated ? <Admin /> : <Navigate to="/admin/login" />}
                />
                <Route path="/admin/login" element={<AdminLogin setAuth={setIsAuthenticated} />} />
                <Route path="/admin/signup" element={<AdminSignup />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;


