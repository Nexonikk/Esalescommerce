// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { axiosBase } from "../axios";
// import type { Product } from "../types";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-blue-50">
        <Navbar />
        <main className="mt-0  pt-16">
          <Hero />
          <Products />
        </main>
      </div>
    </>
  );
};

export default Landing;
