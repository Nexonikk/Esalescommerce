import { Link } from "react-router-dom";
import type { Product } from "../types";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-blue-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-900">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
