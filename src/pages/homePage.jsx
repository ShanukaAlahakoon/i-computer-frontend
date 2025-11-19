import Header from "../components/header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./productPage.jsx";
import Cart from "./cart.jsx";
import ProductOverview from "./productOverview.jsx";
import CheckOut from "./checkOut.jsx";

export default function HomePage() {
  return (
    <div className="w-full h-full overflow-y-scroll max-h-full">
      <Header />
      <div className="w-full min-h-[calc(100%-100px)]">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
