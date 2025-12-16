import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LuListCollapse } from "react-icons/lu";
import UserData from "./userData";

export default function Header() {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  return (
    // Header Wrapper
    <header className="w-full h-[100px] bg-accent flex items-center px-6 relative z-50">
      {/* --- LEFT SECTION: Logo & Menu --- */}
      {/* flex-1 දාලා වම් පැත්තට ඉඩ වෙන් කරනවා */}
      <div className="flex flex-1 items-center justify-start gap-4">
        <LuListCollapse
          onClick={() => setSidebarOpen(true)}
          className="text-white text-3xl cursor-pointer lg:hidden"
        />
        <img src="/logo.png" className="h-[60px] object-contain" alt="logo" />
      </div>

      {/* --- CENTER SECTION: Desktop Navigation (THE FIX) --- */}
      {/* OLD (Bad): absolute left-1/2 ... */}
      {/* NEW (Good): flex-none (හෝ w-auto) දාලා මැදට ගන්නවා */}
      <div className="hidden lg:flex items-center gap-[30px] text-xl text-primary font-medium">
        <Link to="/" className="hover:text-white transition">
          Home
        </Link>
        <Link to="/products" className="hover:text-white transition">
          Products
        </Link>
        <Link to="/about" className="hover:text-white transition">
          About
        </Link>
        <Link to="/contact" className="hover:text-white transition">
          Contact
        </Link>
      </div>

      {/* --- RIGHT SECTION: UserData & Cart --- */}
      {/* flex-1 දාලා දකුණු පැත්තට ඉඩ වෙන් කරනවා, justify-end දාලා අයිනට යවනවා */}
      <div className="flex flex-1 items-center justify-end gap-6">
        <div className="hidden lg:block">
          <UserData />
        </div>
        <Link to="/cart" className="text-primary text-xl">
          <BiShoppingBag size={30} />
        </Link>
      </div>

      {/* --- MOBILE SIDEBAR (No Changes Here) --- */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          sideBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 w-[280px] h-screen bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          sideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full h-[100px] bg-accent flex justify-between items-center px-4">
          <img src="/logo.png" className="h-[60px] object-contain" alt="logo" />
          <LuListCollapse
            onClick={() => setSidebarOpen(false)}
            className="text-white text-3xl cursor-pointer rotate-180"
          />
        </div>

        <div className="flex flex-col text-xl text-secondary gap-6 mt-6 px-6 font-medium">
          <div className="w-full bg-accent rounded-xl p-3 flex justify-center shadow-md">
            <UserData />
          </div>
          <Link
            to="/"
            className="hover:text-accent transition border-b pb-2"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-accent transition border-b pb-2"
            onClick={() => setSidebarOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="hover:text-accent transition border-b pb-2"
            onClick={() => setSidebarOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-accent transition border-b pb-2"
            onClick={() => setSidebarOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
