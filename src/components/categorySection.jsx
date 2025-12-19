// src/components/categorySection.jsx

import { useEffect, useState } from "react";
import ProductCard from "./productCard";

export default function CategorySection({ category, products }) {
  const [visibleRows, setVisibleRows] = useState(2);
  const [itemsPerRow, setItemsPerRow] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) setItemsPerRow(5);
      else if (width >= 1024) setItemsPerRow(4);
      else if (width >= 768) setItemsPerRow(3);
      else setItemsPerRow(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCount = visibleRows * itemsPerRow;
  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = products.length > visibleCount;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-secondary border-b border-gray-300 pb-2 flex items-center gap-3">
        {category}
        <span className="text-sm font-normal text-gray-500 ml-auto">
          ({products.length} Items)
        </span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
        {displayedProducts.map((item) => (
          <div key={item.productID} className="h-full flex flex-col">
            <ProductCard product={item} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={() => setVisibleRows((prev) => prev + 2)}
            className="px-6 py-2 rounded-full border border-gold text-gold hover:bg-gold hover:text-primary transition-all duration-300 text-sm font-bold uppercase tracking-wider cursor-pointer"
          >
            Show More {category}
          </button>
        </div>
      )}
    </div>
  );
}
