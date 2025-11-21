import { BiShoppingBag } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LuListCollapse } from "react-icons/lu";

export default function Header() {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="w-full h-[100px] bg-accent flex relative">
      <LuListCollapse
        onClick={() => {
          setSidebarOpen(true);
        }}
        className="text-white my-auto text-2xl ml-6 lg:hidden"
      />
      <img src="/logo.png" className="h-full " alt="logo" />
      <div className="w-full h-full hidden lg:flex text-primary  justify-center items-center gap-[30px] text-xl">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <Link
        to="/cart"
        className="absolute right-6 top-1/2 -translate-y-1/2 text-primary text-xl"
      >
        <BiShoppingBag size={30} />
      </Link>

      {sideBarOpen && (
        <div className="fixed lg:hidden w-screen h-screen top-0 bg-black/50 z-20 transition-all duration-300 left-0">
          <div className="w-[250px] h-screen flex flex-col border-2 relative">
            <div className="absolute w-full h-full flex flex-col  bg-white left-[-250px] transform-flat translate-x-[250px] transition-transform duration-1000">
              <div className="w-full h-[100px] bg-accent flex justify-center items-center">
                <img src="/logo.png" className="h-full " alt="logo" />
                <LuListCollapse
                  onClick={() => {
                    setSidebarOpen(false);
                  }}
                  className="text-white my-auto text-2xl ml-6 lg:hidden rotate-180"
                />
              </div>
              <div className="w-full h-full flex flex-col text-xl text-secondary justify-start items-start  gap-6 mt-10 pl-6">
                {/* Home */}
                <a
                  href="/"
                  className="hover:text-secondary transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  Home
                </a>
                {/* Products */}
                <a
                  href="/products"
                  className="hover:text-secondary transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  Products
                </a>
                {/* About */}
                <a
                  href="/about"
                  className="hover:text-secondary transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  About
                </a>
                {/* Contact */}
                <a
                  href="/contact"
                  className="hover:text-secondary transition"
                  onClick={() => setSidebarOpen(false)}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
