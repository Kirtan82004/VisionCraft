import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewsStart,
  fetchReviewsSuccess,
  fetchReviewsFailure,
  addReview,
  editReview,
  removeReview,
} from "../../store/reviewSlice";
import {
  addProductReview,
  getProductReviews,
  deleteProductReview,
  editProductReview,
} from "../../services/user/reviewService";

const AddProductReview = ({ onReviewAdded }) => {
  const { productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.reviews);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchReviewsStart());
    try {
      const response = await addProductReview(productId, { rating, comment });
      dispatch(addReview(response));
      setComment("");
      setRating(0);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      dispatch(fetchReviewsFailure(err.message));
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h3 className="text-xl font-bold mb-4">Add a Review</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rating</label>
          <select
            className="border border-gray-300 rounded px-4 py-2 w-full"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>{star} Stars</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Comment</label>
          <textarea
            className="border border-gray-300 rounded px-4 py-2 w-full"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

const GetProductReviews = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { reviews, loading } = useSelector((state) => state.reviews);

  useEffect(() => {
    const fetchReviews = async () => {
      dispatch(fetchReviewsStart());
      try {
        const data = await getProductReviews(productId);
        dispatch(fetchReviewsSuccess(data));
      } catch (err) {
        dispatch(fetchReviewsFailure(err.message));
      }
    };
    fetchReviews();
  }, [dispatch, productId]);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold">Customer Reviews</h3>
      {loading ? <p>Loading...</p> : reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="bg-gray-100 p-4 rounded mb-2">
            <p className="text-gray-700">
              <strong>{review.user.name}</strong> ({review.rating}⭐)
            </p>
            <p className="text-gray-600">{review.comment}</p>
            <EditProductReview review={review} />
            <DeleteProductReview reviewId={review._id} />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

const EditProductReview = ({ review }) => {
  const [comment, setComment] = useState(review.comment);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
      const updatedReview = await editProductReview(review._id, { comment });
      dispatch(editReview(updatedReview));
    } catch (err) {
      console.error("Failed to update review", err);
    }
  };

  return (
    <div>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="border p-2 w-full" />
      <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">
        Update Review
      </button>
    </div>
  );
};

const DeleteProductReview = ({ reviewId }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await deleteProductReview(reviewId);
      dispatch(removeReview(reviewId));
    } catch (err) {
      console.error("Failed to delete review", err);
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600">
      Delete Review
    </button>
  );
};

export { AddProductReview, GetProductReviews, EditProductReview, DeleteProductReview };
