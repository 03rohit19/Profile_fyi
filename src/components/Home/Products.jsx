import React, { useState } from "react";
import { Link } from "react-router-dom";

const Products = ({ data }) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const { image, title, category, id, price } = data;

  // Format the price as currency
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="relative mt-24 mb-2 p-2 w-80 h-[500px] inline-block transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
      <Link to={`/product/${id}`}>
        <div className="group relative w-auto h-[350px] con">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-transparent group-hover:opacity-75 lg:aspect-none lg:h-80">
            {loading && (
              <div className="bg-gray-200 h-[300px] rounded-xl md:h-full w-full md:object-fill md:object-center object-contain lg:h-full lg:w-full animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"></div>
            )}
            <img
              src={image}
              alt={title}
              onLoad={handleImageLoad}
              className={`bg-white border h-[300px] rounded-xl md:h-full w-full md:object-fill md:object-center object-contain lg:h-full lg:w-full ${
                loading ? "hidden" : "block"
              }`}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 md:text-xl">{category}</h3>
            <p className="mt-1 text-sm text-gray-500">{title}</p>
          </div>
          <p className="text-sm md:text-xl font-medium text-gray-900">
            {formatPrice(price)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Products;
