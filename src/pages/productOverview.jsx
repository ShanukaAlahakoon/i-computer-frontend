import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { useState, useEffect } from "react";
import ImageSlider from "../components/imageSlider";
import { addToCart, getCart } from "../utils/cart";

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
    <>
      {status == "loading" && <Loader />}
      {status == "error" && (
        <h1 className="text-center mt-10">Failed to load product details.</h1>
      )}
      {status == "success" && (
        // Changed: flex-col for mobile, lg:flex-row for desktop
        <div className="w-full min-h-[calc(100vh-100px)] flex flex-col lg:flex-row">
          {/* Changed: w-full for mobile, lg:w-1/2 for desktop. Added justify-center for alignment */}
          <div className="w-full lg:w-1/2 h-full flex flex-col p-4 lg:p-6 items-center justify-center">
            <ImageSlider images={product.images} />
          </div>

          {/* Changed: w-full for mobile, lg:w-1/2 for desktop */}
          <div className="w-full lg:w-1/2 h-full flex flex-col p-6 lg:p-8 gap-6 lg:gap-8">
            {/* Changed: text-3xl for mobile to prevent overflow, text-4xl for desktop */}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
              {product.name}
            </h1>

            <h2 className="text-xl text-gray-600">{product.productID}</h2>

            <h3 className="text-lg text-gray-500 flex items-center">
              {product.category}
            </h3>

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

            {/* Changed: Buttons wrapper to handle mobile layout better */}
            <div className="w-full flex flex-col sm:flex-row gap-4 lg:gap-6 mt-4">
              <button
                onClick={() => {
                  addToCart(product, 1);
                }}
                // Added flex-1 to make buttons equal width and full width on mobile
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
                  console.log(getCart());
                }}
                // Added flex-1
                className="flex-1 border border-accent text-accent px-6 py-3 rounded hover:bg-accent hover:text-white transition text-center"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
