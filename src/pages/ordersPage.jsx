import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../components/loader.jsx";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer.jsx";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setOrders(res.data.orders);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full h-screen flex justify-center bg-gray-50 p-10 overflow-y-auto">
      {loaded ? (
        <div className="w-full max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Order Management
            </h1>

            <Link
              to="/products"
              className="flex items-center gap-2 text-gray-500 hover:text-accent transition font-bold text-lg mt-4 md:mt-0"
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
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse min-w-[800px]">
              <thead className="bg-gray-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer Email</th>
                  <th className="px-6 py-4 font-semibold">Customer Name</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
                {orders.map((order, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.orderId}
                      </td>

                      <td className="px-6 py-4 text-gray-500">{order.email}</td>

                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {order.name}
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {new Date(order.date).toDateString()}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-xs font-bold border border-gray-300 shadow-sm">
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right font-bold text-gray-900">
                        LKR. {order.total.toFixed(2)}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <ViewOrderInfoCustomer order={order} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {orders.length === 0 && (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center">
                <p className="mb-4">No orders found.</p>
                <Link
                  to="/products"
                  className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
