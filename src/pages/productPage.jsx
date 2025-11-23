import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
        console.log(res.data);
        setProducts(res.data.products);
        setLoaded(true);
      });
    }
  }, []);

  return (
    // Change: Changed h- to min-h- to allow scrolling on mobile
    // Added overflow-y-auto to handle content overflow
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center overflow-y-auto">
      {!loaded ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex justify-center p-4 flex-row flex-wrap gap-4">
          {products.map((item) => {
            return <ProductCard key={item.productID} product={item} />;
          })}
        </div>
      )}
    </div>
  );
}
