import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../components/loader.jsx";
import { GoVerified } from "react-icons/go";
import toast from "react-hot-toast";

const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data.users);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full h-screen flex justify-center bg-gray-50 p-10 overflow-y-auto">
      {loaded ? (
        <div className="w-full max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            User Management
          </h1>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto">
            <table className="w-full table-auto text-left border-collapse min-w-[800px]">
              <thead className="bg-gray-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Image</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">First Name</th>
                  <th className="px-6 py-4 font-semibold">Last Name</th>
                  <th className="px-6 py-4 font-semibold">Role</th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 text-gray-700 text-sm">
                {users.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={item.image ? item.image : defaultAvatar}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-200"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultAvatar;
                          }}
                        />
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        <div className="flex items-center gap-2">
                          {item.email}{" "}
                          {item.isEmailVerified && (
                            <GoVerified className="text-blue-500" />
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {item.firstName}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {item.lastName}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        <span className="capitalize">{item.role}</span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`py-1 px-3 rounded-full text-xs font-bold border shadow-sm ${
                            item.isBlocked
                              ? "bg-red-100 text-red-700 border-red-200"
                              : "bg-green-100 text-green-700 border-green-200"
                          }`}
                        >
                          {item.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button
                          className={`px-4 py-2 rounded-lg shadow text-xs font-bold uppercase transition-all duration-300 text-white ${
                            item.isBlocked
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          }`}
                          onClick={async () => {
                            await axios.put(
                              import.meta.env.VITE_BACKEND_URL +
                                `/users/toggle-block/${item.email}`,
                              {
                                isBlocked: !item.isBlocked,
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${localStorage.getItem(
                                    "token"
                                  )}`,
                                },
                              }
                            );
                            setLoaded(false);
                            toast.success(
                              `User ${
                                item.isBlocked ? "unblocked" : "blocked"
                              } successfully`
                            );
                          }}
                        >
                          {item.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {users.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No users found.
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
