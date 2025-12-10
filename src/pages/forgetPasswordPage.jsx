import { useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/verify-otp", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      setLoading(false);
      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      console.error("Error resetting password:", err);
      toast.error("Failed to reset password. Please try again.");
      setLoading(false);
    }
  }

  async function sendOtp() {
    setLoading(true);
    try {
      await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email
      );
      setLoading(false);
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Failed to send OTP. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {loading && <Loader />}
      {otpSent ? (
        <div className="w-[400px] h-[500px] flex flex-col justify-center items-center bg-white rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setOtp(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      ) : (
        <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-white rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-4">Forget Password</h1>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            onClick={sendOtp}
          >
            Send OTP
          </button>
        </div>
      )}
    </div>
  );
}
