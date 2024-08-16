import React from "react";
import { FaSearch } from "react-icons/fa";

const SubHeader = ({
  setCategory,
  setPrice,
  setRating,
  setSearchQuery,
  searchQuery,
}) => {
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="bg-slate-50 flex flex-wrap justify-between p-4 space-y-4 md:space-y-0 border-b ">
        <div className="flex flex-col md:flex-row md:space-x-4 p-4">
          <select
            onChange={handleCategoryChange}
            className="border-none p-0 mb-2 md:mb-0 outline-none text-gray-500 bg-transparent font-semibold"
          >
            <option value="">Filter by category</option>
            <option value="all">All</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="women's clothing">Women's clothing</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
          </select>
          <select
            onChange={handlePriceChange}
            className="border-none p-0 mb-2 md:mb-0 outline-none text-gray-500 bg-transparent font-semibold"
          >
            <option value="">Filter by price</option>
            <option value="all">All</option>
            <option value="0-100">0-100</option>
            <option value="100-200">100-200</option>
            <option value="200-300">200-300</option>
          </select>
          <select
            onChange={handleRatingChange}
            className="border-none p-0 mb-2 md:mb-0 outline-none text-gray-500 bg-transparent font-semibold"
          >
            <option value="">Filter by rating</option>
            <option value="all">All</option>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>
        </div>
        <div className="p-4 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name "
              className="outline-none rounded p-2 w-full pl-10 text-sm md:text-base font-semibold "
              style={{ paddingRight: "2.5rem" }}
              value={searchQuery} // Bind input value to searchQuery state
              onChange={handleSearchChange} // Call handleSearchChange on input change
            />
            <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
