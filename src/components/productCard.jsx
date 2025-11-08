export default function ProductCard(props) {
  const product = props.product;
  return (
    <div className="w-[400px] h-[400px] shadow-2xl m-4 cursor-pointer ">
      <div className="w-full h-[250px] relative">
        <img
          src={product.images[1]}
          className="w-full bg-white h-full hover:opacity-0 transition-opacity object-cover duration-300 absolute"
        />
        <img
          src={product.images[0]}
          className="w-full bg-white h-full hover:opacity-0 transition-opacity object-cover duration-300 absolute"
        />
      </div>
      <div className="w-full h-[150px] p-2 flex flex-col justify-between">
        <h1 className="text-center mt-2">{product.name}</h1>
        <div className="w-full flex flex-col items-center">
          {product.labeledPrice > product.price && (
            <h1 className="text-red-500 line-through ml-2">
              LKR. {product.labeledPrice.toFixed(2)}
            </h1>
          )}
          {
            <h1 className="text-green-500 ml-2">
              LKR. {product.price.toFixed(2)}
            </h1>
          }
        </div>
      </div>
    </div>
  );
}
