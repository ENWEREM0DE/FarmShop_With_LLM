import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from '../Assets/cross_icon.png';
import { useNavigate } from 'react-router-dom';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const navigate = useNavigate(); // Use the useNavigate hook

    const fetchInfo = () => {
        fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => setAllProducts(data));
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({id:id}),
        });

        fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => setAllProducts(data));
    }

    const handleProductClick = (product) => {
        navigate(`/admin/product/${product.id}`, { state: { product } }); // Navigate and pass the product data
    }

    return (
        <div className="listproduct">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product) => {
                    return (
                        <div key={product.id}>
                            <div className="listproduct-format-main listproduct-format" onClick={() => handleProductClick(product)}>
                                <img className="listproduct-product-icon" src={product.image} alt="" />
                                <p>{product.name}</p>
                                <p>₦{product.price}</p>
                                <p>{product.category}</p>
                                <img className="listproduct-remove-icon" onClick={(event) => { event.stopPropagation(); removeProduct(product.id); }} src={cross_icon} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListProduct;
