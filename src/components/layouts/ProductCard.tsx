import { TCartData, TProduct } from "@/types";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";

type ProductCardProps = {
  product: TProduct;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    <div className="">
      <Card className=" rounded-md overflow-hidden">
        <Link  to={`/bicycles/${product.slug}`}>
        <img
          src="/src/assets/bicycle-pic-2.jpg"
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        </Link>

        <CardContent className="p-4">
          <div className="flex items-center justify-between">
          <Link  to={`/bicycles/${product.slug}`} className="text-lg font-semibold">{product.name}</Link>
          <p className="px-2 py-1 text-xs font-semibold text-primary border border-gray-400 rounded-md">
         {product.inStock && product.stockQuantity ? "In Stock" : "Out of Stock"}
        </p>
          </div>
          <p className="text-blue-500 font-bold">{product.price} BDT</p>
          <p className="text-gray-600">
            Available Colors:{" "}
            <span className="font-semibold text-black">
              {product.colors.length > 0
                ? product.colors.join(", ")
                : "Color Not Found"}
            </span>
          </p>
          <div className="flex gap-2 mt-4">
            <Link className="" to={`/checkout/${product._id}`}>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Buy Now
            </Button>
            </Link>
            <Button
              onClick={() => handleSaveProductOnLocalStorage(product)}
              variant="outline"
              className="w-1/2"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;



