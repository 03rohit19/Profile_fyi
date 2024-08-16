import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div className="min-h-full border-b">
        <nav className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
            <div className="flex h-16 items-center justify-between ">
              <div className="flex items-center ">
                <div className="flex-shrink-0">
                  <h1 className="text-xl">
                    <span className="trapezium font-bold">S</span>
                    <span style={{ color: "black" }}>TITCHSAVVY</span>
                  </h1>
                </div>
              </div>
              <div className="hidden md:flex space-x-4 font-medium">
                <Link
                  to="/"
                  className=" text-black hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className=" text-black hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  About us
                </Link>
                <Link
                  to="/contact"
                  className=" text-black hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Contact us
                </Link>
              </div>

              <div className="hidden md:block ">
                <div className="ml-4 flex items-center">
                  <div className="flex space-x-4">
                    <Link
                      to="/cart"
                      className="  px-3 py-2 text-[16px] font-medium flex text-black   hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span>
                        <FaCartShopping className="m-1" />
                      </span>
                      {cartItems.length === 0
                        ? "Cart"
                        : `Cart-${cartItems.length}`}
                    </Link>
                    <a
                      href="#"
                      className="  px-3 py-2 text-[16px] font-medium flex  text-black hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span>
                        <FaUser className="m-1" />
                      </span>
                      Login
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMenu}
                  className="text-gray-300 hover:text-white focus:outline-none"
                >
                  {menuOpen ? (
                    <FaTimes className="text-2xl" />
                  ) : (
                    <FaBars className="text-2xl" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {menuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/" className="text-gray-300 block px-1">
                  Home
                </Link>
                <Link to="/about" className="text-gray-300 block px-1">
                  About us
                </Link>
                <Link to="/contact" className="text-gray-300 block px-1">
                  Contact us
                </Link>

                <div className="flex flex-col text-gray-300">
                  <Link to="/cart" className=" text-[16px] font-medium flex">
                    <span>
                      <FaCartShopping className="m-1" />
                    </span>
                    {cartItems.length === 0
                      ? "Cart"
                      : `Cart-${cartItems.length}`}
                  </Link>
                  <a href="#" className=" py-2 text-[16px] font-medium flex">
                    <span>
                      <FaUser className="m-1" />
                    </span>
                    Login
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
