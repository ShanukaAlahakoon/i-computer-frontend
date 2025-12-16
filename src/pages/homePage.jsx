import Header from "../components/header";
import Footer from "../components/footer.jsx";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./productPage.jsx";
import Cart from "./cart.jsx";
import ProductOverview from "./productOverview.jsx";
import OrdersPage from "./ordersPage.jsx";
import CheckOut from "./checkOut.jsx";
import Home from "./home.jsx";
import About from "./about.jsx";
import Contact from "./contact.jsx";

export default function HomePage() {
  return (
    <div className="w-full h-screen overflow-y-scroll overflow-x-hidden max-h-full">
      <Header />
      <div className="w-full min-h-[calc(100%-100px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/overview/:productID" element={<ProductOverview />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
