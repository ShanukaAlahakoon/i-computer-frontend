import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    maxWidth: "650px",
    width: "95%",
    maxHeight: "90vh",
    overflow: "hidden",
    backgroundColor: "white",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
};

const getStatusBadgeStyles = (status) => {
  const s = status.toLowerCase();
  if (s === "pending") return "bg-gold/20 text-gold border border-gold/30";
  if (s === "processing" || s === "dispatched")
    return "bg-blue-100 text-blue-700 border border-blue-200";
  if (s === "delivered" || s === "completed")
    return "bg-green-100 text-green-700 border border-green-200";
  if (s === "cancelled") return "bg-red-100 text-red-700 border border-red-200";
  return "bg-gray-100 text-secondary border border-gray-200";
};

export default function ViewOrderInfo({ order }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notesVisible, setNotesVisible] = useState(order.notes);
  const [status, setStatus] = useState(order.status);

  const formattedDate = new Date(order.date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-accent text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-accent/90 transition-colors duration-200 shadow-sm"
      >
        View Details
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customModalStyles}
        contentLabel="Order Details Modal"
        ariaHideApp={false}
      >
        {/* Modal Container - Flex Column layout */}
        <div className="flex flex-col h-full text-secondary bg-white max-h-[90vh]">
          {/* --- HEADER (Sticky Top) --- */}
          <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-white shrink-0">
            <div>
              <h2 className="text-xl font-bold text-accent">Order Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                Review the full breakdown of this order.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-400 hover:text-accent transition-colors p-1"
              title="Close"
            >
              {/* Simple Close Icon (X) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* --- SCROLLABLE CONTENT BODY --- */}
          <div className="grow overflow-y-auto p-6 space-y-6 bg-white">
            {/* Top Summary Grid (2 Columns on large screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Order ID
                </p>
                <p className="font-mono font-medium text-accent">
                  {order.orderId}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Status
                </p>
                <div className="flex flex-row">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadgeStyles(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date Placed
                </p>
                <p className="font-medium">{formattedDate}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Total Amount
                </p>
                <p className="font-bold text-accent text-lg">
                  LKR {order.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Customer Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4 border-t border-gray-100">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Customer Name
                </p>
                <p className="font-medium">{order.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </p>
                <p className="font-medium truncate" title={order.email}>
                  {order.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Phone
                </p>
                <p className="font-medium">{order.phone}</p>
              </div>
            </div>

            {/* Address Block (Using Primary Theme Color background) */}
            <div className="bg-primary p-4 rounded-lg border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Delivery Address
              </p>
              <p className="text-sm leading-relaxed whitespace-pre-line text-secondary font-medium">
                {order.address}
              </p>
            </div>

            {/* Notes Block (Optional) - Highlighted with Gold theme color */}

            <div className=" p-4 rounded-lg border border-gold/20">
              <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-1">
                Additional Notes
              </p>
              <textarea
                className="text-sm text-secondary italic w-full outline-0"
                value={order.notes}
                onChange={(e) => {
                  if (e.target.value == "") {
                    setNotesVisible(null);
                  } else {
                    setNotesVisible(e.target.value);
                  }
                }}
              ></textarea>
            </div>

            {/* Items Section */}
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                <h3 className="font-bold text-accent">Items in this order</h3>
                <span className="text-sm text-gray-500">
                  {order.items.length} items
                </span>
              </div>

              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 py-2">
                    {/* Item Image */}
                    <div className="h-16 w-16 shrink-0 bg-white border border-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="grow flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <p className="font-semibold text-secondary line-clamp-2 pr-2">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 font-mono mt-0.5">
                          ID: {item.productID}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Qty: {item.quantity} | Unit Price: LKR{" "}
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                      {/* Line Total */}
                      <div className="mt-2 sm:mt-0 text-right shrink-0">
                        <p className="font-bold text-accent">
                          LKR {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- FOOTER (Sticky Bottom) --- */}
          <div className="p-6 border-t gap-2 border-gray-100 bg-gray-50 shrink-0 flex justify-end">
            {(order.notes != notesVisible || order.status != status) && (
              <button
                onClick={() => {
                  const token = localStorage.getItem("token");
                  axios
                    .put(
                      import.meta.env.VITE_BACKEND_URL +
                        `/orders/${order.orderId}`,
                      {
                        notes: notesVisible,
                        status: status,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((res) => {
                      toast.success("Order updated successfully.");
                      window.location.reload();
                      setIsModalOpen(false);
                    })
                    .catch((err) => {
                      toast.error("Error updating order.");
                      console.error("Error updating order:", err);
                    });
                }}
                className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors mr-2"
              >
                Save Changes
              </button>
            )}

            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
