import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductReviews({ productID }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (productID) {
      fetchReviews();
    }
  }, [productID]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/product/${productID}`
      );

      if (Array.isArray(res.data)) {
        setReviews(res.data);
      } else if (res.data.reviews && Array.isArray(res.data.reviews)) {
        setReviews(res.data.reviews);
      } else {
        setReviews([]);
      }
    } catch (err) {
      console.error(err);
      setReviews([]);
    }
  };

  const submitReview = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to submit a review.");
      return;
    }

    if (comment.trim() === "") {
      toast.error("Please write a comment.");
      return;
    }

    setLoading(true);

    const data = {
      productID: productID,
      rating: parseInt(rating),
      comment: comment,
    };

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/reviews/add", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        toast.success("Review submitted successfully!");
        setComment("");
        setRating(5);
        fetchReviews();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to submit review. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-full mt-10 p-4 lg:p-8 bg-primary rounded-lg shadow-sm border border-gray-200/50">
      <h2 className="text-2xl font-bold text-secondary mb-6 border-l-4 border-gold pl-3">
        Customer Reviews
      </h2>

      {/* --- Review Form --- */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Write a Review
        </h3>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Your Rating:
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-2xl transition-colors duration-200 focus:outline-none ${
                    star <= (hoverRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment Box */}
          <textarea
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold min-h-[100px]"
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            onClick={submitReview}
            disabled={loading}
            className="self-start px-6 py-2 bg-accent text-white font-semibold rounded hover:bg-accent/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>

      {/* --- Reviews List --- */}
      <div className="flex flex-col gap-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className="border-b border-gray-200 pb-6 last:border-0 bg-white p-4 rounded-lg"
            >
              <div className="flex items-start gap-4">
                <img
                  src={
                    review.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                    <h4 className="font-bold text-secondary text-md">
                      {review.name}
                    </h4>
                    <span className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex text-gold text-sm mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < review.rating ? "text-gold" : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
