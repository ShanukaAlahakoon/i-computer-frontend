import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    console.log("Logging clicked");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log("Response:", res);

      localStorage.setItem("token", res.data.token);
      const token = localStorage.getItem("token");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
      <div className="w-[50%] h-full flex flex-col justify-center items-center ">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[200px] h-[200px] mb-5 object-cover"
        />
        <h1 className="text-[50px] text-center text-gold text-shadow-accent text-shadow-2xs font-bold">
          Plug In. Power Up. Play Hard.
        </h1>
        <p className="text-[30px] text-white italic text-center">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px]">
          <h1 className="text-[40px] font-bold mb-5 text-white text-shadow-white ">
            Login
          </h1>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Your email"
            type="email"
            className="w-full h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Your password"
            type="password"
            className="w-full h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[20px] focus:outline-none focus:ring-gold focus:ring-2"
          />
          <p className="text-white not-italic text-right w-full mb-5">
            Forgest your password?
            <Link to="/register" className="text-gold italic">
              Reset here
            </Link>
          </p>
          <button
            onClick={login}
            className="w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent"
          >
            Login
          </button>
          <p className="text-white not-italic">
            Don't have an account?
            <Link to="/register" className="text-gold italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
