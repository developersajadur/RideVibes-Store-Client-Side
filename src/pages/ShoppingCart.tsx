import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fifa 19",
      category: "PS4",
      originalPrice: 60.0,
      price: 44.0,
      discount: 27,
      quantity: 2,
      image: "/fifa19.jpg",
    },
    {
      id: 2,
      name: "Glacier White 500GB",
      category: "PS4",
      originalPrice: 299.99,
      price: 249.99,
      discount: 17,
      quantity: 1,
      image: "/ps4.jpg",
    },
    {
      id: 3,
      name: "Platinum Headset",
      category: "PS4",
      originalPrice: 150.0,
      price: 119.99,
      discount: 20,
      quantity: 1,
      image: "/headset.jpg",
    },
  ]);

  const [shippingCost, setShippingCost] = useState(5.0);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleQuantityChange = (id, type) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log(
      "Order Placed:",
      cartItems.map((item) => ({ orderId: item.id, quantity: item.quantity }))
    );
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10" && !discountApplied) {
      setShippingCost(0);
      setDiscountApplied(true);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalCost = subtotal + shippingCost;

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white p-2 md:p-6 shadow-md rounded-lg">
          <h3 className="text-lg md:text-xl font-medium mb-4">
            {cartItems.length} Items
          </h3>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border-b bg-gray-50 p-2 md:p-4 rounded-md shadow-sm mb-4"
            >
              {/* Product Image and Details */}
              <div className="flex gap-4 items-center w-full md:w-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg shadow"
                />
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="text-md md:text-lg font-semibold text-primary">
                        {item.name}
                      </h4>
                      {/* Delete Button (Visible on Mobile) */}
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 text-xl md:text-2xl md:hidden"
                      >
                        <MdOutlineDelete />
                      </button>
                    </div>
                    <div className="text-md md:text-lg flex flex-col md:flex-row gap-1 md:gap-3 items-start md:items-center font-semibold text-blue-600">
                      <p className="text-primary font-semibold">
                        Price: {item.price.toFixed(2)} BDT{" "}
                      </p>
                      <p className="text-primary line-through text-sm">
                        ৳{item.originalPrice.toFixed(2)} BDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity & Price (Visible on Larger Screens) */}
              <div className="flex flex-row-reverse md:flex-col items-center md:items-end gap-2 mt-2 md:mt-0">
                {/* Delete Button (Hidden on Mobile) */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-xl md:text-2xl hidden md:block"
                >
                  <MdOutlineDelete />
                </button>
                <p className="text-md md:text-lg font-semibold">
                  {(item.price * item.quantity).toFixed(2)} BDT
                </p>
                <div className="flex items-center bg-gray-100 border rounded-md overflow-hidden">
                  <button
                    className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  >
                    -
                  </button>
                  <span className="px-3 md:px-4 font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    className="px-2 md:px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                    onClick={() => handleQuantityChange(item.id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white h-fit p-4 md:p-6 shadow-md rounded-lg">
          <h3 className="text-lg md:text-xl font-medium mb-4 text-gray-800">
            Order Summary
          </h3>
          <div className="flex justify-between mb-3 text-gray-600">
            <span>Subtotal ({cartItems.length} items)</span>
            <span className="font-semibold">{subtotal.toFixed(2)} BDT</span>
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold text-gray-700">
              Promo Code
            </label>
            <div className="flex mt-1">
              <input
                type="text"
                className="border rounded-l p-2 w-full text-sm"
                placeholder="Enter your code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button
                className="bg-red-500 text-white px-4 rounded-r hover:brightness-110"
                onClick={applyPromoCode}
              >
                Apply
              </button>
            </div>
            {discountApplied && (
              <p className="text-green-500 text-sm mt-2">
                Promo applied! Free shipping.
              </p>
            )}
          </div>
          <div className="flex justify-between text-md md:text-lg font-semibold mt-4 text-gray-800">
            <span>Total</span>
            <span>{totalCost.toFixed(2)} BDT</span>
          </div>
          <button
            className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
