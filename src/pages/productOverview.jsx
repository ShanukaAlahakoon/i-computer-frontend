import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import { useState, useEffect } from "react";

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

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
      //fetch product details from backend using params.productID
      //setProduct(fetchedProduct);
    }
  }, []);

  return (
    <>
      {status == "loading" && <Loader />}
      {status == "error" && (
        <h1 className="text-center mt-10">Failed to load product details.</h1>
      )}
      {status == "success" && (
        <div className="w-full h-[calc(100vh-100px)] flex ">
          <div className="w-1/2 h-full flex justify-center items-center">
            <img src={product.images[0]} />
          </div>
          <div className="w-1/2 h-full flex flex-col p-10 gap-4">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
          </div>
        </div>
      )}
    </>
  );
}
