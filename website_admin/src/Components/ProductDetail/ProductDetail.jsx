import React from "react";
import { useLocation } from "react-router-dom";
import { PieChart } from '@mui/x-charts/PieChart';
import "./ProductDetail.css";

const ProductDetail = () => {
    const location = useLocation();
    const { product } = location.state || {}; // Get the product data from location state

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>Price: ₦{product.price}</p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>

            <div className="descriptionbox-description">
                <h2><i>Customer Review Chart</i></h2>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: product.positiveReviews, label: 'Positive' },
                                { id: 1, value: product.negativeReviews, label: 'Negative' },
                            ],
                        },
                    ]}
                    width={400}
                    height={200}
                />
            </div>

            <div className="product-comments">
                <h2>Comments</h2>
                {product.comments.length > 0 ? (
                    product.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment.text}</p>
                            <span>{new Date(comment.created).toLocaleString()}</span>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;

