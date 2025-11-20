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
    <div className="w-full flex justify-center p-10 relative bg-gradient-to-b from-primary to-white text-secondary">
      {loaded ? (
        <div className="w-full rounded-2xl overflow-x-auto">
          {" "}
          {/* Scrollable container */}
          <table
            className="w-full max-w-7xl table-auto border-separate border-spacing-0
              rounded-2xl overflow-hidden shadow-xl bg-white/70"
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
            <tbody className="bg-white text-sm">
              {products.map((item) => {
                return (
                  <tr
                    key={item.productID}
                    className="hover:bg-gray-50 transition-all duration-300"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.images[0]}
                        className="w-[40px] h-[40px] rounded-full object-cover shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4">{item.productID}</td>
                    <td className="px-6 py-4 font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-lg font-semibold text-accent">
                      {item.price}
                    </td>
                    <td className="px-6 py-4 text-lg text-accent">
                      {item.labeledPrice}
                    </td>
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
                      <div className="inline-flex items-center gap-2">
                        <Link
                          to={`/admin/update-product/${item.productID}`}
                          className="px-3 py-2 rounded-md w-[70px] text-center bg-accent/20 hover:underline"
                          state={{ product: item }}
                        >
                          Edit
                        </Link>
                        <ProductDeleteButton
                          productId={item.productID}
                          reload={() => {
                            setLoaded(false);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center py-10">
          <Loader />
        </div>
      )}

      <Link
        to="/admin/add-product"
        className="fixed right-6 bottom-6 w-16 h-16 bg-accent text-white rounded-full flex justify-center items-center text-4xl shadow-xl hover:bg-gold transition-all duration-300"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
