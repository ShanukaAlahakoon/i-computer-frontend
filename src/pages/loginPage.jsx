import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
          token: response.access_token,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error("Google login failed. Please try again.");
          console.error("Error during Google login:", error);
          setIsLoading(false);
        });
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
    onNonOAuthError: (error) => {
      console.error("Google non-OAuth error:", error);
    },
  });

  async function login() {
    console.log("Logging clicked");
    console.log("Email:", email);
    console.log("Password:", password);
    setIsLoading(true);

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
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const token = localStorage.getItem("token");

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setIsLoading(false);

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Error during login:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen md:h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-[50%] shrink-0 flex flex-col justify-end md:justify-center items-center p-4 md:p-0 pb-2 md:pb-0">
        <img
          src="/logo.png"
          alt="logo"
          className="w-20 h-20 md:w-[200px] md:h-[200px] mb-2 md:mb-5 object-cover drop-shadow-lg"
        />
        <h1 className="text-2xl md:text-[50px] text-center text-gold text-shadow-accent text-shadow-2xs font-bold px-4">
          Plug In. Power Up.
          <br /> Play Hard.
        </h1>
        <p className="text-sm md:text-[30px] text-white italic text-center mt-1 md:mt-2 opacity-90">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>

      <div className="w-full md:w-1/2 grow md:grow-0 flex justify-center items-start md:items-center p-4">
        <div className="w-full max-w-[450px] h-auto backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-6 md:p-[30px] border border-white/10 mt-2 md:mt-0">
          <h1 className="text-2xl md:text-[40px] font-bold mb-4 md:mb-5 text-white text-shadow-white">
            Login
          </h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            type="email"
            className="w-full h-[45px] md:h-[50px] mb-4 md:mb-5 rounded-lg border border-accent p-2.5 text-base md:text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            type="password"
            className="w-full h-[45px] md:h-[50px] mb-4 md:mb-5 rounded-lg border border-accent p-2.5 text-base md:text-[20px] focus:outline-none focus:ring-gold focus:ring-2"
          />

          <p className="text-white not-italic text-right w-full mb-4 md:mb-5 text-sm md:text-base">
            Forget your password?
            <Link to="/forgot-password" className="text-gold italic ml-1">
              Reset here
            </Link>
          </p>

          <button
            onClick={login}
            className="w-full mb-4 md:mb-5 h-[45px] md:h-[50px] bg-accent text-white font-bold text-lg md:text-[20px] rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300"
          >
            Login
          </button>

          <button
            onClick={googleLogin}
            className="w-full h-[45px] md:h-[50px] bg-transparent text-white font-bold text-lg md:text-[20px] rounded-lg border-2 border-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all duration-300"
          >
            Login with{" "}
            <GrGoogle className="inline ml-2 text-xl md:text-2xl mb-1" />
          </button>

          <p className="text-white not-italic mt-4 md:mt-5 text-sm md:text-base">
            Don't have an account?
            <Link to="/register" className="text-gold italic ml-1">
              Register here
            </Link>
          </p>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}
