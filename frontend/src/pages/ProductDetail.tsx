import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosBase } from "../axios";
import type { Product } from "../types";
import { ShoppingCart } from "lucide-react";
import Spinner from "../components/Spinner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosBase.get<Product>(`/products/${id}`);
        setProduct(response.data);

        // Initialize selectedVariant with default values if available
        if (response.data.variants && response.data.variants.length > 0) {
          const defaultVariant: Record<string, string> = {};
          response.data.variants.forEach((variant) => {
            defaultVariant[variant.name] = variant.value;
          });
          setSelectedVariant(defaultVariant);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariant((prev) => ({
      ...prev,
      [variantName]: value,
    }));
  };

  const handleBuyNow = () => {
    if (!product) return;

    const subtotal = product.price * quantity;

    navigate("/checkout", {
      state: {
        product,
        quantity,
        selectedVariant,
        subtotal,
      },
    });
  };

  if (!product) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  ${product.price.toFixed(2)}
                </div>

                {product.variants && product.variants.length > 0 && (
                  <div className="mb-6">
                    {Array.from(
                      new Set(product.variants.map((v) => v.name))
                    ).map((variantName) => (
                      <div key={variantName} className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {variantName}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {product.variants
                            ?.filter((v) => v.name === variantName)
                            .map((variant) => (
                              <button
                                key={variant.id}
                                onClick={() =>
                                  handleVariantChange(
                                    variant.name,
                                    variant.value
                                  )
                                }
                                className={`px-4 py-2 rounded-md border capitalize ${
                                  selectedVariant[variant.name] ===
                                  variant.value
                                    ? "bg-blue-500 text-white border-blue-500"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
                              >
                                {variant.value}
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(product.inventory)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Buy Now - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetail;
