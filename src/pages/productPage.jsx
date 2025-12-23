import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import CategorySection from "../components/categorySection";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "CPU",
    "Graphic Card",
    "Motherboard",
    "Power Supply",
    "RAM",
    "Storage",
    "Cooling",
    "Computer Cases",
    "Mouse and Keyboards",
    "Monitors",
    "Accessories",
    "Laptops",
    "Computer",
    "Other",
  ];

  useEffect(() => {
    if (!loaded) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((res) => {
        setProducts(res.data.products);
        setLoaded(true);
      });
    }
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const endpoint = query === "" ? "/products" : "/products/search/" + query;

    const res = await axios.get(import.meta.env.VITE_BACKEND_URL + endpoint);
    setProducts(res.data.products);
    setLoaded(true);
  };

  //sort products by category with most products first
  const sortedCategories = categories
    .map((category) => {
      const categoryProducts = products.filter(
        (product) => product.category === category
      );
      return {
        name: category,
        products: categoryProducts,
      };
    })
    .filter((group) => group.products.length > 0) // Remove categories with no products
    .sort((a, b) => b.products.length - a.products.length); // Sort by number of products in descending order

  return (
    <div className="w-full min-h-[calc(100vh-100px)] flex flex-col items-center overflow-y-auto pb-10">
      {!loaded ? (
        <div className="flex items-center justify-center h-full w-full">
          <Loader />
        </div>
      ) : (
        <div className="w-full px-4 md:px-8 max-w-[1600px]">
          {/* Search Bar Section */}
          <div className="w-full h-[100px] sticky top-0 z-20 flex bg-primary justify-center items-center mb-6 shadow-md">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full max-w-2xl bg-primary border border-secondary/20 text-secondary rounded-lg px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold placeholder-gray-500"
              onChange={handleSearch}
            />
          </div>

          {searchQuery !== "" ? (
            <div className="w-full">
              <h2 className="text-xl font-bold mb-6 text-gold">
                Search Results
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {products.map((item) => (
                  <ProductCard key={item.productID} product={item} />
                ))}
              </div>

              {products.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                  No products found.
                </p>
              )}
            </div>
          ) : (
            <div className="w-full flex flex-col gap-12">
              {sortedCategories.map((group) => (
                <CategorySection
                  key={group.name}
                  category={group.name}
                  products={group.products}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
