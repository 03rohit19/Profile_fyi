import { useEffect, useState } from "react";
import Products from "./Products";
import Header2 from "../Header/Header2";
import Footer from "../Footer/Footer";
import products from "../../data/data";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, category, price, rating, searchQuery]); // Run filter when products, category, price, rating changes

  useEffect(() => {
    const footerTimer = setTimeout(() => {
      setShowFooter(true);
    }, 1000);

    return () => clearTimeout(footerTimer);
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data); // Initialize filtered products
    } catch (error) {
      console.log(error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (category !== "" && category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Filter by price
    if (price !== "" && price !== "all") {
      if (price === "0-100") {
        filtered = filtered.filter(
          (product) => product.price >= 0 && product.price < 100
        );
      } else if (price === "100-200") {
        filtered = filtered.filter(
          (product) => product.price >= 100 && product.price < 200
        );
      } else if (price === "200-1000") {
        filtered = filtered.filter(
          (product) => product.price >= 200 && product.price <= 1000
        );
      }
    }

    // Filter by rating
    if (rating !== "" && rating !== "all") {
      if (rating === "1") {
        filtered = filtered.filter(
          (product) => product.rating.rate >= 1 && product.rating.rate < 2
        );
      } else if (rating === "2") {
        filtered = filtered.filter(
          (product) => product.rating.rate >= 2 && product.rating.rate < 3
        );
      } else if (rating === "3") {
        filtered = filtered.filter(
          (product) => product.rating.rate >= 3 && product.rating.rate < 4
        );
      } else if (rating === "4") {
        filtered = filtered.filter(
          (product) => product.rating.rate >= 4 && product.rating.rate < 5
        );
      } else if (rating === "5") {
        filtered = filtered.filter((product) => product.rating.rate >= 5);
      }
    }

    // Filter by search query
    if (searchQuery !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Header2
        setCategory={setCategory}
        setPrice={setPrice}
        setRating={setRating}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      />{" "}
      {/* Pass setPrice to Header2 */}
      <div className="mx-auto bg-slate-50 mb-16">
        <div className="flex flex-wrap justify-center gap-4 ">
          {filteredProducts.map((data) => (
            <Products key={data.id} data={data} />
          ))}
        </div>
      </div>
      {showFooter && <Footer />}
    </>
  );
};

export default Home;
