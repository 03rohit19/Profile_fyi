import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../Header/Header";
import { addItem } from "../../utils/cartSlice";
import Footer from "../Footer/Footer";
import Confetti from "react-confetti";

const ProductPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(""); // State for the selected size
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useDispatch();

  const handleAddItem = (data) => {
    dispatch(addItem(data));
    setShowConfetti(true);
    alert(`${data.title} added to cart`);

    // Hide confetti after few seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchProducts();
    }
  }, [id]);

  const { image, title, rating, price } = data || {};
  const { rate, count } = rating || {};

  // Format the price as currency in Indian Rupees
  const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update the selected size state
  };

  return (
    <>
      <Header />
      {showConfetti && <Confetti />}
      <div className="flex items-center justify-center mt-16 md:mb-24">
        <div className="flex flex-col md:flex-row font-sans md:w-[600px] md:gap-x-4">
          <div className="flex-none w-full md:w-48 relative aspect-w-1 aspect-h-1">
            <img
              src={image}
              alt={title}
              className="w-full h-full md:object-fill md:object-center object-contain"
              loading="lazy"
            />
          </div>
          <div className="flex-auto p-6 border border-slate-200 rounded-lg">
            <div className="flex flex-wrap">
              <h1 className="flex-auto text-lg font-semibold text-slate-900">
                {title}
              </h1>
              <div className="text-lg font-semibold text-slate-500">
                {formatPrice(price)}
              </div>
              <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                Rating : {rating?.rate}
                <span className="text-yellow-500 text-lg">&#9733;</span>
              </div>
              <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                In stock
              </div>
            </div>
            <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
              <div className="space-x-2 flex text-sm">
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="xs"
                    checked={selectedSize === "xs"} // Controlled state
                    onChange={handleSizeChange}
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                    XS
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="s"
                    checked={selectedSize === "s"} // Controlled state
                    onChange={handleSizeChange}
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                    S
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="m"
                    checked={selectedSize === "m"} // Controlled state
                    onChange={handleSizeChange}
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                    M
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="l"
                    checked={selectedSize === "l"} // Controlled state
                    onChange={handleSizeChange}
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                    L
                  </div>
                </label>
                <label>
                  <input
                    className="sr-only peer"
                    name="size"
                    type="radio"
                    value="xl"
                    checked={selectedSize === "xl"} // Controlled state
                    onChange={handleSizeChange}
                  />
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                    XL
                  </div>
                </label>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-6 text-sm font-medium">
              <div className="flex-auto flex space-x-4 mb-4 md:mb-0">
                <button
                  className="h-10 px-6 font-semibold rounded-md bg-black text-white"
                  type="submit"
                >
                  Buy now
                </button>
                <button
                  className="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900 hover:bg-black hover:text-white"
                  type="button"
                  onClick={() => handleAddItem(data)}
                >
                  Add to cart
                </button>
              </div>
              <button
                className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-red-600 border border-slate-200"
                type="button"
                aria-label="Like"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-700">
              Free shipping on all continental INDIAN orders.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
