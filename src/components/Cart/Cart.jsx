import React, { useState } from "react";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const [discount, setDiscount] = useState(""); // Discount code or percentage
  const [discountError, setDiscountError] = useState(""); // Error message for discount
  const [quantityError, setQuantityError] = useState({}); // Error message for quantity

  const handleRemove = (id, uniqueId) => {
    dispatch(removeItem({ id, uniqueId }));
  };

  const handleQuantityChange = (id, uniqueId, quantity) => {
    if (quantity < 1 || isNaN(quantity)) {
      setQuantityError((prev) => ({
        ...prev,
        [uniqueId]: "Quantity must be a positive number.",
      }));
    } else {
      setQuantityError((prev) => ({
        ...prev,
        [uniqueId]: "",
      }));
      dispatch(
        updateQuantity({ id, uniqueId, quantity: parseInt(quantity, 10) })
      );
    }
  };

  const validateDiscount = (code) => {
    if (code) {
      const discountValue = parseFloat(code);
      if (discountValue > 0 && discountValue <= 100) {
        return { isValid: true, amount: discountValue / 100 }; // Percentage discount
      } else if (discountValue > 0) {
        return { isValid: true, amount: discountValue }; // Fixed discount
      } else {
        return { isValid: false, error: "Invalid discount value." };
      }
    }
    return { isValid: true, amount: 0 }; // No discount
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discountResult = validateDiscount(discount);
  const discountAmount = discountResult.isValid
    ? discountResult.amount > 1
      ? discountResult.amount
      : subtotal * discountResult.amount
    : 0;
  const shippingEstimate = 5.0;
  const taxEstimate = 8.32;
  const totalAfterDiscount = subtotal - discountAmount;
  const orderTotal = totalAfterDiscount + shippingEstimate + taxEstimate;

  return (
    <>
      <Header />
      <div className="border border-slate-400 h-auto rounded-3xl p-5 mt-5 m-5">
        <div className="mt-6">
          <h1 className="text-2xl md:text-4xl font-semibold text-center">
            Shopping Cart
          </h1>
        </div>
        <div className="text-center p-4">
          {cartItems.length === 0 ? (
            <p className="text-4xl font-bold text-blue-800">
              Your cart is empty
            </p>
          ) : (
            <div className="mt-6 flex flex-col md:flex-row">
              {/* Cart Items Container */}
              <div className="flex flex-col md:w-[65%] h-[50%] bg-gray-100 p-4 space-y-2 border overflow-y-auto mr-4">
                {cartItems.map((item) => (
                  <div
                    key={item.uniqueId}
                    className="flex flex-col md:flex-row bg-gray-100 p-4 space-y-4 md:space-y-0 md:space-x-6 rounded-md"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt="Product Image"
                        className="w-full h-48 md:w-56 md:h-64 object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 p-4">
                      <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                        {item.title}
                      </h2>
                      <h3 className="text-lg text-gray-900">
                        Category: {item.category}
                      </h3>
                      <h3 className="text-lg text-gray-900">
                        Rating: {Math.ceil(item?.rating?.rate)}{" "}
                        <span className="text-yellow-500 text-lg">&#9733;</span>
                      </h3>
                      <p className="text-lg font-medium text-gray-900">
                        ₹{item.price}
                      </p>
                      {quantityError[item.uniqueId] && (
                        <p className="text-red-500 text-sm">
                          {quantityError[item.uniqueId]}
                        </p>
                      )}
                    </div>

                    <div className="flex-shrink-0 p-4">
                      <label
                        htmlFor={`quantity-${item.uniqueId}`}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Quantity
                      </label>
                      <select
                        id={`quantity-${item.uniqueId}`}
                        name="quantity"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            item.uniqueId,
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full md:w-24 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      >
                        {[...Array(10).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:ml-7 md:mt-7 text-red-500 font-bold">
                      <button
                        onClick={() => handleRemove(item.id, item.uniqueId)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-0 md:w-[35%] bg-gray-200 p-4 flex flex-col justify-between border border-gray-300 h-[400px]">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Discount</span>
                    <span className="font-medium text-gray-900">
                      -₹{discountAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping estimate</span>
                    <span className="font-medium text-gray-900">
                      ₹{shippingEstimate.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax estimate</span>
                    <span className="font-medium text-gray-900">
                      ₹{taxEstimate.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700 mt-4">
                    <span className="font-semibold">Order total</span>
                    <span className="font-bold text-gray-900">
                      ₹{orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="discount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apply Discount
                  </label>
                  <input
                    type="text"
                    id="discount"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Enter discount code or percentage"
                    className="mt-1 block w-full text-center border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  />
                  {discountResult.error && (
                    <p className="text-red-500 text-sm">
                      {discountResult.error}
                    </p>
                  )}
                </div>

                <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-4">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
