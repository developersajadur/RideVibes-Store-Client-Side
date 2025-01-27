
const ProductCard = () => {
    return (
        <div className="w-full md:w-80 lg:w-80 bg-white border border-gray-200 rounded-lg overflow-hidden">
        <img
          className="w-full h-60 object-cover"
          src="/src/assets/bicycle-pic-2.jpg"
          alt="Yamaha R15 V4"
        />
        <div className="p-5">
          <h2 className="text-lg font-semibold text-gray-800">
            R15 V4 NON ABS (INDO) 3580KM
          </h2>
          <div className="flex items-center justify-between mt-2">
          <p className=" text-2xl font-bold text-blue-600">৳ 562,000</p>
            <p className="px-2 py-1 text-xs font-semibold text-primary border border-gray-400 rounded-md">
              In Stock
            </p>
          </div>
          <p className="mt-2 text-primary">
            Available Colors: <span className="font-semibold text-black">BLACK</span>
          </p>
          <div className="mt-4 flex gap-4">
            <button className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
              BUY NOW
            </button>
            <button className="flex-1 border border-gray-400 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition">
              🛒 Add To Cart
            </button>
          </div>
        </div>
      </div>
    );
};

export default ProductCard;