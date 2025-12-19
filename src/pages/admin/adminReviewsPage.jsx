import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/loader";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(() => {
    if (!reviewsLoaded) {
      fetchReviews();
    }
  }, [reviewsLoaded]);

  const fetchReviews = () => {
    const token = localStorage.getItem("token");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          setReviews(res.data.reviews || []);
        }
        setReviewsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch reviews");
        setReviewsLoaded(true);
      });
  };

  const deleteReview = (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/delete/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Review deleted successfully");

        setReviews((prevReviews) =>
          prevReviews.filter((review) => review.reviewID !== reviewId)
        );
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete review. It might not exist.");
      });
  };
  return (
    <div className="w-full h-full flex flex-col items-center bg-gray-50 p-10 overflow-y-auto">
      {!reviewsLoaded ? (
        <Loader />
      ) : (
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Reviews Management
          </h1>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse min-w-[800px]">
              <thead className="bg-gray-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Product ID</th>
                  <th className="px-6 py-4 font-semibold">Reviewer</th>
                  <th className="px-6 py-4 font-semibold">Rating</th>
                  <th className="px-6 py-4 font-semibold w-1/3">Comment</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No reviews found.
                    </td>
                  </tr>
                ) : (
                  reviews.map((review, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 align-top">
                        {review.productID}
                      </td>

                      <td className="px-6 py-4 align-top">
                        <div className="font-bold text-gray-800">
                          {review.name || "Anonymous"}
                        </div>
                        {review.email && (
                          <div className="text-xs text-gray-500">
                            {review.email}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 align-top">
                        <div className="flex text-yellow-400 text-base">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 font-semibold mt-1 block">
                          {review.rating} / 5
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600 italic align-top whitespace-normal">
                        "{review.comment}"
                      </td>

                      <td className="px-6 py-4 text-gray-500 align-top">
                        {new Date(
                          review.date || Date.now()
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-center align-top">
                        <button
                          onClick={() => deleteReview(review.reviewID)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-4 rounded-lg text-xs font-bold shadow-md transition-transform active:scale-95"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
