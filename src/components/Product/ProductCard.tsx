import { TCartData, TProduct } from "@/types";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";


type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const handleSaveProductOnLocalStorage = (product: TProduct) => {
    const cartItems = JSON.parse(localStorage.getItem("cart-items") || "[]");
  
    const existingProduct = cartItems.find((item: TCartData) => item._id === product._id);   
    if (existingProduct) {
      toast.error("You have already added this product!");
      return;
    }
    cartItems.push({ ...product, orderQuantity: 1 });
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    toast.success("Product added to cart successfully!");
  };
  

  return (
    <div className="w-full md:w-80 lg:w-80 bg-white border border-gray-200 rounded-lg overflow-hidden">
      <img
        className="w-full h-60 object-cover"
        src="/src/assets/bicycle-pic-2.jpg"
        alt={product.name}
      />
      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <div className="flex items-center justify-between mt-2">
          <p className="text-2xl font-bold text-blue-600">৳ {product.price}</p>
          <p className="px-2 py-1 text-xs font-semibold text-primary border border-gray-400 rounded-md">
            {product.inStock && product.stockQuantity ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <p className="mt-2 text-primary">
          Available Colors:{" "}
          <span className="font-semibold text-black">
            {product.colors.length > 0 ? product.colors.join(", ") : "Color Not Found"}
          </span>
        </p>
        <div className="mt-4 flex gap-4">
          {/* Link with the generated URL */}
          <Link to={`/bicycles/${product.slug}`}>
            <Button className="flex-1 bg-secondary text-white font-semibold py-2 rounded-lg hover:bg-primary hover:text-secondary transition">
              View Details
            </Button>
          </Link>
          <Button 
          onClick={() => handleSaveProductOnLocalStorage(product)}
          className="flex-1 bg-transparent border border-gray-400 text-primary font-semibold py-2 rounded-lg hover:bg-gray-100 transition">
            🛒 Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
