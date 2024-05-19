import {useState} from "react";
import axios from 'axios';
import './Comments.css'
const Comments = ({ product, setNumNegativeReviews, setNumPositiveReviews }) => {
    const [comments, setComments] = useState(product.comments || []);
    const [newComment, setNewComment] = useState("")

    // Handle input change
    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(product.category)
        console.log(product)
        if (newComment.trim()) {
            try {
                const response = await axios.post(`http://localhost:4000/products/${product.id}/comments`, { text: newComment });
                const responseSentimentResponse = await axios.post('http://localhost:8080/predict', {comment: newComment});
                const sentiment = responseSentimentResponse.data[0].label === "POSITIVE"
                console.log("Analysis:")
                console.log(sentiment)
                if (sentiment) {
                    setNumPositiveReviews(prevCount => prevCount + 1)
                }else {
                    setNumNegativeReviews(prevCount => prevCount + 1)
                }
                const sentimentAddedRes = await axios.post(`http://localhost:4000/products/${product.id}/analysis`, {isPositive: sentiment});
                console.log(sentimentAddedRes)
                setComments([...comments, response.data.comment]);  // Assuming the backend returns the newly added comment
                setNewComment('');
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    };

    return (
        <div className="comment-box">
            <h2>Comments</h2>
            <div className="comments-list">
                {comments.map((comment, index) => (
                    <div key={index} className="comment">{comment.text}</div>
                ))}
            </div>
            <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                    value={newComment}
                    onChange={handleInputChange}
                    placeholder="Write a comment..."
                />
                <button type="submit">Post Comment</button>
            </form>
        </div>
    );
}

export default Comments;