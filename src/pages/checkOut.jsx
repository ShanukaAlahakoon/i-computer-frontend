import { BsChevronUp } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [cart, setCart] = useState(location.state);

  if (location.state == null) {
    navigate("/products");
  }

  function calculateTotal() {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    return total;
  }

  async function submitOrder() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please log in to place an order.");
      navigate("/login");
      return;
    }

    const orderData = [];

    cart.forEach((item) => {
      orderData.push({
        productID: item.productID,
        quantity: item.quantity,
      });
    });

    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/orders",
        {
          name: name,
          address: address,
          phone: phone,
          items: orderData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success("Order placed successfully!");
        navigate("/ ");
      })
      .catch((err) => {
        toast.error("Failed to place order. Please try again.");
        console.error(err);
      });
  }
  return (
    // Main Page Container
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      {/* Cart Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cart Items List */}
        <div className="flex flex-col divide-y divide-gray-100">
          {cart.map((item, index) => {
            return (
              <div
                key={item.productID}
                // Changed: Padding adjusted for mobile (p-4 vs p-6)
                className="flex flex-col md:flex-row items-center p-4 md:p-6 hover:bg-gray-50/50 transition-colors duration-200"
              >
                {/* Product Image & Details Section */}
                {/* Changed: Gap adjusted (gap-4 vs gap-6) */}
                <div className="flex flex-1 w-full md:w-auto items-center gap-4 md:gap-6">
                  {/* Changed: Image size adjusted (w-20 vs w-24) */}
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      className="h-full w-full object-contain"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="relative group w-fit">
                      {/* Changed: Text size adjusted */}
                      <h1 className="text-base md:text-lg font-bold text-gray-800 leading-tight cursor-help">
                        {item.name.length > 20
                          ? item.name.substring(0, 20) + "..."
                          : item.name}
                      </h1>
                      <span className="pointer-events-none absolute opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs rounded py-1 px-2 bottom-full left-0 mb-2 whitespace-nowrap z-10 shadow-lg">
                        {item.name}
                        <svg
                          className="absolute text-gray-900 h-2 w-full left-0 top-full"
                          x="0px"
                          y="0px"
                          viewBox="0 0 255 255"
                        >
                          <polygon
                            className="fill-current"
                            points="0,0 127.5,127.5 255,0"
                          />
                        </svg>
                      </span>
                    </div>

                    <h1 className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                      ID: {item.productID}
                    </h1>

                    <div className="flex items-baseline gap-2 mt-1">
                      {item.labeledPrice > item.price && (
                        <h1 className="text-sm text-gray-400 line-through">
                          LKR. {item.labeledPrice.toFixed(2)}
                        </h1>
                      )}
                      <h1 className="text-sm md:text-md font-semibold text-emerald-600">
                        LKR. {item.price.toFixed(2)}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Controls & Subtotal Section */}
                <div className="flex w-full md:w-1/2 justify-between items-center mt-4 md:mt-0 md:pl-4">
                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg px-2 py-1 mx-auto md:mx-0">
                    <button
                      className="p-1 text-gray-500 hover:text-accent transition active:scale-90"
                      onClick={() => {
                        const copiedCart = [...cart];
                        copiedCart[index].quantity += 1;
                        setCart(copiedCart);
                      }}
                    >
                      <BsChevronUp size={14} />
                    </button>

                    <h1 className="text-md font-bold text-gray-700 min-w-5 text-center leading-none my-1">
                      {item.quantity}
                    </h1>

                    <button
                      className="p-1 text-gray-500 hover:text-accent transition active:scale-90"
                      onClick={() => {
                        const copiedCart = [...cart];
                        copiedCart[index].quantity -= 1;
                        if (copiedCart[index].quantity <= 0) {
                          copiedCart.splice(index, 1);
                        }
                        setCart(copiedCart);
                      }}
                    >
                      <BsChevronUp className="rotate-180" size={14} />
                    </button>
                  </div>

                  {/* Item Subtotal */}
                  <span className="text-lg font-bold text-gray-800 w-[150px] text-right">
                    LKR. {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shipping Information Section */}
        {/* Changed: Padding adjusted (p-6 vs p-8) */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Shipping Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Address
              </label>
              <textarea
                id="address"
                rows="3"
                placeholder="Enter full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer / Checkout Section */}
        {/* Changed: flex-col-reverse for mobile (Total on top, Order Button on bottom) */}
        <div className="bg-gray-50 p-6 md:p-8 flex flex-col-reverse md:flex-row justify-between items-center border-t border-gray-200 gap-4">
          <button
            onClick={submitOrder}
            // Changed: w-full for mobile to be easily clickable
            className="w-full md:w-auto px-8 py-3 rounded-lg bg-accent border border-gray-300 text-white font-medium hover:bg-gray-100 hover:text-accent transition shadow-sm"
          >
            Order Now
          </button>

          {/* Changed: w-full and justify-between for mobile */}
          <div className="w-full md:w-auto flex justify-between md:justify-start items-center gap-6">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              LKR. {calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
