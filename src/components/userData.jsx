import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserData() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);
  const [selectedOption, setSelectedOption] = useState("user");

  return (
    <div className="flex items-center">
      {user ? (
        <div className="flex flex-row items-center gap-2">
          <img
            src={user.image}
            className="w-10 h-10 rounded-full object-cover border-2 border-white"
            alt="User"
            referrerPolicy="no-referrer"
          />
          <select
            className="bg-accent outline-none text-white font-medium cursor-pointer text-sm max-w-[120px]"
            value={selectedOption}
            onChange={(e) => {
              if (e.target.value == "logout") {
                localStorage.removeItem("token");
                window.location.href = "/login";
              } else if (e.target.value == "my-orders") {
                window.location.href = "/orders";
              }
              setSelectedOption("user");
            }}
          >
            <option className="bg-accent text-white" value={"user"}>
              {user.firstName}
            </option>
            <option className="bg-accent text-white" value={"logout"}>
              Logout
            </option>
            <option className="bg-accent text-white" value={"my-orders"}>
              My Orders
            </option>
          </select>
        </div>
      ) : (
        // Changed: w-[150px] removed. Better button styling.
        <div className="flex flex-row items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-1.5 bg-white text-accent rounded-lg text-sm font-bold whitespace-nowrap"
          >
            Login
          </Link>
          <span className="text-white">/</span>
          <Link
            to="/register"
            className="px-4 py-1.5 border border-white text-white rounded-lg text-sm font-bold whitespace-nowrap"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
