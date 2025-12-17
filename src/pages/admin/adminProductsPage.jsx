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
    <div className="w-full h-screen flex justify-center bg-gray-50 p-4 overflow-y-auto relative">
      {loaded ? (
        // Added pb-20 to ensure content isn't hidden behind the floating button or cut off at screen edge
        <div className="w-full pb-20">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Management
          </h1>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              {" "}
              {/* Inner scroll wrapper */}
              <table className="w-full table-auto text-left border-collapse">
                <thead className="bg-gray-900 text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Image</th>
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Price</th>
                    <th className="px-4 py-3 font-semibold">Lbl Price</th>
                    <th className="px-4 py-3 font-semibold">Category</th>
                    <th className="px-4 py-3 font-semibold">Brand</th>
                    <th className="px-4 py-3 font-semibold">Model</th>
                    <th className="px-4 py-3 font-semibold text-center">
                      Stock
                    </th>
                    <th className="px-4 py-3 font-semibold text-center">
                      Availability
                    </th>
                    <th className="px-4 py-3 font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
                  {products.map((item, index) => {
                    // Check if it's the last row
                    const isLast = index === products.length - 1;
                    const rowClass = isLast ? "" : "border-b border-gray-200";

                    return (
                      <tr
                        key={item.productID}
                        className={`hover:bg-gray-50 transition-colors duration-200 ${rowClass}`}
                      >
                        <td className="px-4 py-3">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200"
                          />
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                          {item.productID}
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-800 wrap-break-words min-w-[150px]">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="px-4 py-3 text-gray-500 line-through text-xs whitespace-nowrap">
                          {item.labeledPrice}
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-gray-100 text-gray-800 py-1 px-2 rounded text-xs font-medium whitespace-nowrap">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {item.brand}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {item.model}
                        </td>
                        <td className="px-4 py-3 text-center font-medium">
                          {item.stock}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`py-1 px-3 rounded-full text-xs font-bold border shadow-sm whitespace-nowrap ${
                              item.isAvailable
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-red-100 text-red-700 border-red-200"
                            }`}
                          >
                            {item.isAvailable ? "Available" : "No Stock"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center items-center gap-2">
                            <Link
                              to={`/admin/update-product/${item.productID}`}
                              state={{ product: item }}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase bg-blue-500 text-white hover:bg-blue-600 shadow transition-all duration-300"
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
            {products.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}

      <Link
        to="/admin/add-product"
        className="fixed right-10 bottom-10 w-14 h-14 bg-gray-900 text-white rounded-full flex justify-center items-center text-3xl shadow-xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 z-50"
      >
        <BiPlus />
      </Link>
    </div>
  );
}
