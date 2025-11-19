import { BsChevronUp } from "react-icons/bs";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    // Main Page Container: Light gray background for contrast, full viewport height
    <div className="w-full min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      {/* Cart Container: A unified white card with shadow */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Cart Items List */}
        <div className="flex flex-col divide-y divide-gray-100">
          {cart.map((item, index) => {
            return (
              <div
                key={item.productID}
                className="flex flex-col md:flex-row items-center p-6 hover:bg-gray-50/50 transition-colors duration-200"
              >
                {/* Product Image & Details Section */}
                <div className="flex flex-1 w-full md:w-auto items-center gap-6">
                  <div className="w-24 h-24 shrink-0 bg-white border border-gray-200 rounded-lg p-2 flex items-center justify-center">
                    <img
                      src={item.image}
                      className="h-full w-full object-contain"
                      alt={item.name}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="relative group w-fit">
                      <h1 className="text-lg font-bold text-gray-800 leading-tight cursor-help">
                        {item.name.length > 20
                          ? item.name.substring(0, 20) + "..."
                          : item.name}
                      </h1>
                      {/* Tooltip: Improved styling */}
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
                      <h1 className="text-md font-semibold text-emerald-600">
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

        {/* Footer / Checkout Section */}
        <div className="bg-gray-50 p-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 gap-4">
          <button className="px-8 py-3 rounded-lg bg-accent border border-gray-300 text-white font-medium hover:bg-gray-100 hover:text-accent transition shadow-sm">
            Order Now
          </button>

          <div className="flex items-center gap-6">
            <span className="text-gray-500 font-medium">Subtotal</span>
            <span className="text-2xl font-bold text-gray-900">
              LKR. {calculateTotal().toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
