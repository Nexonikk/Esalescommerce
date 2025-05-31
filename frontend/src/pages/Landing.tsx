// import { useEffect, useState } from "react";
// import ProductCard from "../components/ProductCard";
// import { axiosBase } from "../axios";
// import type { Product } from "../types";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";

const Landing = () => {
  //   const [products, setProducts] = useState<Product[]>([]);
  //   const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const response = await axiosBase.get<Product[]>("/products");
  //         setProducts(response.data);
  //         console.log(response.data);
  //       } catch (error) {
  //         console.error("Error fetching products:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchProducts();
  //   }, []);

  //   if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="min-h-screen bg-blue-50">
        <Navbar />
        <main className="mt-0  pt-16">
          <Hero />
          <Products />
          {/* <h2 className="text-3xl font-semibold mb-8 text-center text-blue-900">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div> */}
        </main>
      </div>
    </>
  );
};

export default Landing;
