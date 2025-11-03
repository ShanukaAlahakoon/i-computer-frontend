import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import Loader from "../../components/loader.jsx";
import ProductDeleteButton from "../../components/productDeleteButton.jsx";

export default function AdminProductsPage() {
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
  }, [loaded]);

  return (
    <div
      className="w-full flex justify-center p-10 relative
      bg-gradient-to-b from-primary to-white text-secondary"
    >
      {loaded ? (
        <table
          className="w-full max-w-7xl table-auto border-separate border-spacing-0
        rounded-2xl overflow-hidden shadow-xl bg-white/70 
        "
        >
          <thead className="bg-accent text-white uppercase tracking-wide text-xs">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Labeled Price</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Brand</th>
              <th className="px-6 py-3">Model</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {products.map((item) => {
              return (
                <tr key={item.productID} className="hover:bg-gray-100">
                  <td className="px-6 py-4">
                    <img
                      src={item.images[0]}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4">{item.productID}</td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.price}</td>
                  <td className="px-6 py-4">{item.labeledPrice}</td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">{item.brand}</td>
                  <td className="px-6 py-4">{item.model}</td>
                  <td className="px-6 py-4">{item.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-semibold ${
                        item.isAvailable ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <ProductDeleteButton
                      productId={item.productID}
                      reload={() => setLoaded(false)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}

      <Link
        to="/admin/add-product"
        className="fixed right-6 bottom-6 w-16 h-16 bg-accent text-white rounded-full flex justify-center items-center text-4xl shadow-xl hover:bg-gold transition-all duration-200"
      >
        <BiPlus />
      </Link>
    </div>
  );
}

// <td className="px-6 py-4">
//                       <span
//                         className={`font-semibold ${
//                           item.isAvailable ? "text-green-500" : "text-red-500"
//                         }`}
//                       >
//                         {item.isAvailable ? "Available" : "Out of Stock"}
//                       </span>
//                     </td>
