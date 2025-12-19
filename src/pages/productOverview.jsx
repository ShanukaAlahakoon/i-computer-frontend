import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { useState, useEffect } from "react";
import ImageSlider from "../components/imageSlider";
import { addToCart } from "../utils/cart";
import ProductReviews from "../components/productReviews";

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
        .then((res) => {
          setProduct(res.data.product);
          setStatus("success");
        })
        .catch((err) => {
          toast.error("Failed to load product details");
          setStatus("error");
        });
    }
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center">
      {status == "loading" && <Loader />}
      {status == "error" && (
        <h1 className="text-center mt-10">Failed to load product details.</h1>
      )}
      {status == "success" && (
        <div className="w-full max-w-[1400px]">
          <div className="w-full px-4 pt-6 lg:px-8">
            <button
              onClick={() => navigate("/products")}
              className="flex items-center gap-2 text-gray-500 hover:text-accent transition font-bold text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Shop More
            </button>
          </div>

          {/* --- Product Details Section --- */}
          <div className="w-full flex flex-col lg:flex-row mt-4">
            <div className="w-full lg:w-1/2 h-full flex flex-col p-4 lg:p-6 items-center justify-center">
              <ImageSlider images={product.images} />
            </div>

            <div className="w-full lg:w-1/2 h-full flex flex-col p-6 lg:p-8 gap-6 lg:gap-8">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
                {product.name}
              </h1>

              <h2 className="text-xl text-gray-600">{product.productID}</h2>

              <h3 className="text-lg text-gray-500 flex items-center">
                {product.category}
              </h3>

              {product.altNames && product.altNames.length > 0 && (
                <div className="flex flex-col">
                  <h4 className="text-md text-gray-700 font-semibold mb-1">
                    {product.altNames.join(" | ")}
                  </h4>
                </div>
              )}

              <p className="text-base text-gray-700 text-justify h-32 overflow-y-auto mb-4 scrollbar-thin">
                {product.description}
              </p>

              <div className="w-full flex flex-col gap-4">
                {product.labeledPrice > product.price && (
                  <h2 className="text-gray-500 line-through decoration-gold/70 decoration-2 text-xl">
                    LKR. {product.labeledPrice.toFixed(2)}
                  </h2>
                )}

                <h2 className="text-4xl text-accent font-semibold">
                  LKR. {product.price.toFixed(2)}
                </h2>
              </div>

              <div className="w-full flex flex-col sm:flex-row gap-4 lg:gap-6 mt-4">
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Added to cart");
                  }}
                  className="flex-1 bg-accent text-white px-6 py-3 rounded hover:bg-accent/80 transition text-center"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    navigate("/checkout", {
                      state: [
                        {
                          productID: product.productID,
                          name: product.name,
                          price: product.price,
                          labeledPrice: product.labeledPrice,
                          quantity: 1,
                          image: product.images[0],
                        },
                      ],
                    });
                  }}
                  className="flex-1 border border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition text-center"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* --- Reviews Section --- */}
          <div className="w-full p-4 lg:p-8 border-t border-gray-200">
            <ProductReviews productID={params.productID} />
          </div>
        </div>
      )}
    </div>
  );
}
