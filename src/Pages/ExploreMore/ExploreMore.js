import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Navigation from "../../Components/Navigation/Navigation";
import ProductsCard from "../../Components/ProductsCard/ProductsCard";

const ExploreMore = () => {
  const [products, setProducts] = useState([]);
  const [isproductLoading, setIsProductLoading] = useState(true);


  // get all products 
  useEffect(() => {
    setIsProductLoading(true)
    fetch(`${process.env.REACT_APP_API_BASE_URL}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setIsProductLoading(false));
  }, []);
  console.log(products);

  return (
    <>
      <Navigation />
      {isproductLoading ? (
        <div className="flex justify-center">
        <div className="w-16 mt-12   h-16 border-blue-600 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
        </div>
      ) : (
        <ProductsCard products={products}></ProductsCard>
      )}
      <Footer></Footer>
    </>
  );
};

export default ExploreMore;
