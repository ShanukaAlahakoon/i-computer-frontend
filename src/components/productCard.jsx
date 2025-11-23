import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <Link
      to={"/overview/" + product.productID}
      className="w-full max-w-[300px] h-[400px] shadow-2xl m-2 sm:m-4 cursor-pointer relative block bg-white rounded-lg overflow-hidden hover:[&_.primary-image]:opacity-0"
    >
      <div className="w-full h-[250px] relative">
        <img
          src={product.images[1]}
          className="w-full bg-white h-full absolute object-cover"
        />
        <img
          src={product.images[0]}
          className="w-full bg-white h-full primary-image transition-opacity object-cover duration-500 absolute"
        />
      </div>

      <div className="w-full h-[150px] p-2 flex flex-col justify-between">
        <h1 className="text-center mt-2 font-bold text-lg text-secondary">
          {product.name}
        </h1>
        <div className="w-full flex flex-col items-center mb-4">
          {product.labeledPrice > product.price && (
            <h1 className="text-red-500 line-through ml-2">
              LKR. {product.labeledPrice.toFixed(2)}
            </h1>
          )}
          {
            <h1 className="text-green-500 ml-2 font-semibold">
              LKR. {product.price.toFixed(2)}
            </h1>
          }
        </div>
      </div>

      {/* Buttons Container */}

      <div className="hidden lg:flex w-full h-[150px] bottom-0 bg-white/90 flex-row justify-center items-center gap-4 absolute opacity-0 hover:opacity-100 transition-opacity duration-500">
        <button className="border-2 border-accent text-accent hover:bg-accent hover:text-white flex justify-center items-center transition-colors duration-150 h-[50px] w-[150px] font-bold rounded">
          View Details
        </button>
      </div>
    </Link>
  );
}
