import { useState } from "react";
import {
  IoHeart,
  IoHeartOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { useGetSingleProductBySlugQuery } from "@/redux/features/product/productApi";
import { TCartData, TProduct } from "@/types";
import { toast } from "sonner";

const ProductDetails = () => {

  const params = useParams();
  const { data, } = useGetSingleProductBySlugQuery({
    slug: params.slug || "",
  });

  const product = data?.data as TProduct;
  console.log(product?.category);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product?.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product?.images.length) % product?.images.length
    );
  };

  const selectThumbnail = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSaveProductOnLocalStorage = (product: TProduct) => {
    const cartItems = JSON.parse(localStorage.getItem("cart-items") || "[]");

    const existingProduct = cartItems.find(
      (item: TCartData) => item._id === product._id
    );
    if (existingProduct) {
      toast.error("You have already added this product!");
      return;
    }
    cartItems.push({ ...product, orderQuantity: 1 });
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    toast.success("Product added to cart successfully!");
  };

  return (
    <div className="px-2 md:px-8 lg:px-10 mt-5 lg:mt-10 mb-5 lg:mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="relative">
          <div className="flex">
            <div className="flex items-center justify-center w-[90%] bg-gray-100 overflow-hidden rounded-md">
              <img
                src={product?.images[currentImageIndex]}
                alt={`Product view ${currentImageIndex + 1}`}
                className="w-[300px] h-[400px] object-cover"
              />
            </div>
            <div className="flex flex-col justify-between gap-[15px] ml-[20px]">
              <div className="flex flex-col gap-[10px]">
                <button className="bg-gray-100 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200">
                  <IoShareSocialOutline className="w-5 h-5" />
                </button>
                <button
                  className="bg-gray-100 rounded-md w-max text-gray-600 p-2.5 hover:bg-gray-200"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  {isFavorite ? (
                    <IoHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <IoHeartOutline className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-[10px]">
                <button
                  onClick={prevImage}
                  className="bg-gray-100 rounded-md w-max text-gray-600 p-2 hover:bg-gray-200"
                  aria-label="Previous image"
                >
                  <BiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-gray-100 rounded-md w-max text-gray-600 p-2 hover:bg-gray-200"
                  aria-label="Next image"
                >
                  <BiChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
          <div className="scrollbar flex w-full md:w-[87%] gap-2 mt-4 overflow-x-auto">
            {product?.images.map((img, index) => (
              <button
                key={index}
                onClick={() => selectThumbnail(index)}
                className={`flex-shrink-0 bg-gray-100 w-20 transition-all duration-300 h-20 rounded-md mb-1 overflow-hidden border-2 ${
                  currentImageIndex === index
                    ? "border-[#0FABCA]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col">
          <h1 className="text-[1.6rem] md:text-[1.8rem] text-gray-800 font-semibold mb-3">
            {product?.name}
          </h1>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Brand:</span> {product?.brand}
          </div>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Categories:</span>{" "}
            {product?.category}
          </div>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Stock Available:</span>{" "}
            {product?.stockQuantity} pcs
          </div>

          <div className="text-gray-600 mb-3">
            <span className="font-semibold">Weight:</span> {product?.weight} KG
          </div>

          {/* {product?.discount > 0 && (
            <div className="text-gray-600 mb-3">
              <span className="font-semibold text-red-600">Discount:</span> -{product?.discount}%
            </div>
          )} */}

          <h2 className="text-[1.4rem] font-semibold text-gray-800 mb-4">
            {product?.price} BDT
          </h2>

          <div className="border-t-[2px] border-gray-200 border-dashed mt-1 pt-6">
            <h2 className="text-gray-700 font-semibold mb-2">Description:</h2>
            <p className="text-[0.9rem] text-gray-600">{product?.description}</p>
          </div>

          <div className="mt-auto flex flex-col md:flex-row gap-4">
            <button
            disabled
              onClick={() => handleSaveProductOnLocalStorage(product)}
              className=" py-3 px-6 bg-secondary text-white hover:bg-primary hover:text-secondary rounded-md"
            >
              🛒 Add To Cart
            </button>
            <Link  to={`/checkout/${product?._id}`}>
            <button  className="grow py-3 px-6 border bg-transparent border-gray-300 text-primary hover:bg-gray-100 rounded-md">
              Checkout Now
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
