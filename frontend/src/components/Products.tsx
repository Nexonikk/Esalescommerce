import { useEffect, useState } from "react";
import { axiosBase } from "../axios";
import type { Product } from "../types";
import ProductCard from "./ProductCard";
import Spinner from "./Spinner";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosBase.get<Product[]>("/products");
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Spinner />;
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold mb-8 text-center text-blue-800">
          Featured Products
        </h2>
        <div
          id="products"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
