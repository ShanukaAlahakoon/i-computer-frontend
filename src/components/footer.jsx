import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] text-white border-t border-gray-800 pt-10 pb-6">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Logo" className="h-10 object-contain" />
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">
                i-Computers
              </h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop shop for high-performance gaming gear, custom PC
              builds, and premium laptops. Level up your reality with us.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-center">
            <h3 className="text-lg font-semibold text-cyan-400 uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2 text-gray-400 md:text-center">
              <Link
                to="/"
                className="hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Products
              </Link>
              <Link
                to="/about"
                className="hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="hover:text-white hover:translate-x-1 transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <h3 className="text-lg font-semibold text-cyan-400 uppercase tracking-wider">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-400 hover:text-white transition-all duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn />
              </a>
            </div>
            <div className="text-gray-400 text-sm mt-2 text-right">
              <p>Email: support@icomputers.com</p>
              <p>Phone: +94 71 422 5346</p>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-800 my-6"></div>

        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-cyan-400">i-Computers</span>. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
