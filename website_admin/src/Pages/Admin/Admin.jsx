import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../../Components/ListProduct/ListProduct";
import ProductDetail from "../../Components/ProductDetail/ProductDetail.jsx";
import UserList from "../../Components/UserList/UserList.jsx";

const Admin = () => {
    return (
        <div className="admin">
            <Sidebar />
            <div className="admin-content">
                <Routes>
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="listproduct" element={<ListProduct />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="users" element={<UserList />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;


