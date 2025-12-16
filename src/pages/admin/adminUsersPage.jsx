import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../components/loader.jsx";
import { GoVerified } from "react-icons/go";
import toast from "react-hot-toast";

// Default Image URL එක (Variable එකක් විදියට උඩින්ම හදාගත්තම ලෙසියි)
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
    <div className="w-full flex justify-center p-10 relative bg-linear-to-b from-primary to-white text-secondary">
      {loaded ? (
        <div className="w-full rounded-2xl overflow-x-auto">
          <table className="w-full max-w-7xl table-auto border-separate border-spacing-0 rounded-2xl overflow-hidden shadow-xl bg-white/70">
            <thead className="bg-accent text-white uppercase tracking-wide text-xs">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">First Name</th>
                <th className="px-6 py-3">Last Name</th>
                <th className="px-6 py-3">Role </th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white text-sm">
              {users.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-all duration-300"
                  >
                    {/* Image Column Fix */}
                    <td className="px-6 py-4">
                      <img
                        src={item.image ? item.image : defaultAvatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultAvatar;
                        }}
                      />
                    </td>
                    {/* End Image Column Fix */}

                    <td className="px-6 py-4 text-sm font-semibold text-secondary flex flex-row items-center gap-2">
                      {item.email}{" "}
                      {item.isEmailVerified ? (
                        <GoVerified className="inline-block text-blue-500" />
                      ) : (
                        ""
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-secondary ">
                      {item.firstName}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-secondary">
                      {item.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-secondary">
                      {item.role}
                    </td>
                    <td className="px-6 py-4 ">
                      {item.isBlocked ? "Blocked" : "Active"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="px-4 py-2 bg-accent text-white rounded-lg shadow hover:bg-gold transition-all duration-300"
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
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center py-10">
          <Loader />
        </div>
      )}
    </div>
  );
}
