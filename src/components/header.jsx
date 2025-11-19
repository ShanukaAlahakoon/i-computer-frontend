import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="w-full h-[100px] bg-accent flex relative">
      <img src="/logo.png" className="h-full " alt="logo" />
      <div className="w-full h-full flex text-primary  justify-center items-center gap-[30px] text-xl">
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
    </header>
  );
}
