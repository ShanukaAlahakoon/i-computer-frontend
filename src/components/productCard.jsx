import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link
      to={"/overview/" + product.productID}
      className="w-full h-full shadow-lg cursor-pointer relative flex flex-col bg-white rounded-lg overflow-hidden hover:[&_.primary-image]:opacity-0 border border-gray-100 transition-transform duration-300 hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="w-full h-[180px] md:h-[250px] relative shrink-0">
        <img
          src={product.images[1]}
          className="w-full bg-white h-full absolute object-contain p-4"
        />
        <img
          src={product.images[0]}
          className="w-full bg-white h-full primary-image transition-opacity object-contain p-4 duration-500 absolute"
          alt={product.name}
        />
      </div>

      {/* Details Container */}
      <div className="w-full flex-1 p-3 flex flex-col justify-between">
        <h1 className="text-center font-bold text-sm md:text-lg text-secondary line-clamp-2 leading-tight">
          {product.name}
        </h1>

        <div className="w-full flex flex-col items-center mt-2 mb-2">
          {product.labeledPrice > product.price && (
            <h1 className="text-red-500 line-through text-xs md:text-sm">
              LKR. {product.labeledPrice.toFixed(2)}
            </h1>
          )}
          <h1 className="text-green-500 font-bold text-sm md:text-lg">
            LKR. {product.price.toFixed(2)}
          </h1>
        </div>
      </div>

      {/* Buttons Container (Desktop Only) */}
      <div className="hidden lg:flex w-full h-[150px] bottom-0 bg-white/90 flex-row justify-center items-center gap-4 absolute opacity-0 hover:opacity-100 transition-opacity duration-500">
        <button className="border-2 border-gold text-gold hover:bg-gold hover:text-white flex justify-center items-center transition-colors duration-150 h-[50px] w-[150px] font-bold rounded">
          View Details
        </button>
      </div>
    </Link>
  );
}
