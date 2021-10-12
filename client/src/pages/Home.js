import React from "react";
import Products from "../components/Products/Products";
import { useState } from "react";
import { AppContext } from "../context/AppContext";
const Home = () => {
  const [products, setProducts] = useState();
  return (
    <AppContext.Provider value={{ products, setProducts }}>
      <Products />
    </AppContext.Provider>
  );
};

export default Home;
