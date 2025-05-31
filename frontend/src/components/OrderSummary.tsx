import React from "react";
import type { Product } from "../types";

interface Props {
  product: Product;
  quantity: number;
  selectedVariant: Record<string, string>;
  subtotal: number;
}

const OrderSummary: React.FC<Props> = ({
  product,
  quantity,
  selectedVariant,
  subtotal,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">{product.name}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Color: {selectedVariant.color}</span>
          <span>Qty: {quantity}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
