import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ProductCard from "./components/productCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProductCard
        name="Laptop"
        price="100,000"
        image="https://picsum.photos/id/1/200/300"
      />
      <ProductCard
        name="Smartphone"
        price="80,000"
        image="https://picsum.photos/id/3/200/300"
      />
      <ProductCard
        name="Smartwatch"
        price="30,000"
        image="https://picsum.photos/id/5/200/300"
      />
    </>
  );
}

export default App;
