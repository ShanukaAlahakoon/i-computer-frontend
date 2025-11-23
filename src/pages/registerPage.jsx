import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/loader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      navigate("/login");

      toast.success("Registration successful! Welcome to i-Computer.");
    } catch (error) {
      toast.error("Registration failed. Please check your details.");
      console.error("Error during request:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 min-h-[40vh] md:h-full flex flex-col justify-center items-center p-5 bg-black/30 md:bg-transparent">
        <img
          src="/logo.png"
          alt="logo"
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] mb-5 object-cover"
        />
        <h1 className="text-[30px] md:text-[50px] text-center text-gold text-shadow-accent text-shadow-2xs font-bold leading-tight">
          Plug In. Power Up. Play Hard.
        </h1>
        <p className="text-[20px] md:text-[30px] text-white italic text-center mt-2">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>

      {/* Right Side: Form */}
      {/* Mobile waladi pahala kotasa, Desktop waladi dakunu pattha */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center p-5 md:p-0 my-auto">
        <div className="w-full max-w-[450px] h-auto backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px] border border-white/10">
          <h1 className="text-[40px] font-bold mb-5 text-white text-shadow-white">
            Register
          </h1>

          <input
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Your first name"
            type="text"
            className="w-full h-[50px] mb-5  rounded-lg border border-accent p-2.5 text-[18px] md:text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <input
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Your last name"
            type="text"
            className="w-full h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[18px] md:text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            type="email"
            className="w-full h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[18px] md:text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            type="password"
            className="w-full h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[18px] md:text-[20px] focus:outline-none focus:ring-gold focus:ring-2"
          />

          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            type="password"
            className="w-full h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[18px] md:text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />

          <button
            onClick={register}
            className="w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent transition-all duration-300"
          >
            Register
          </button>

          <p className="text-white not-italic mt-4 text-sm md:text-base text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-gold italic">
              Login here
            </Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}
