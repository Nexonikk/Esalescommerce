import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import type { Product } from "../types";
import { CreditCard } from "lucide-react";
import { axiosBase } from "../axios";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

interface LocationState {
  product: Product;
  quantity: number;
  selectedVariant: Record<string, string>;
  subtotal: number;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  // State
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state || !state.product) {
      navigate("/");
    }
  }, [navigate, state]);

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = cleaned.match(/\d{4,16}/g);
    const match = matches?.[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : cleaned;
  };

  const formatExpiryDate = (expiry: string) => {
    const cleaned = expiry.replace(/\D/g, "");

    if (cleaned.length === 4) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    }
    return expiry;
  };

  const formatCvv = (value: string): string => {
    return value.replace(/\D/g, "").slice(0, 3);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.fullName.trim()) errors.fullName = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email format is invalid";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      errors.phone = "Phone must be 10 digits";
    }
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State is required";
    if (!formData.zipCode.trim()) errors.zipCode = "Zip code is required";

    if (!formData.cardNumber.trim()) {
      errors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      errors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate.trim()) {
      errors.expiryDate = "Expiry date is required";
    } else {
      const [month, year] = formData.expiryDate.split("/");
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
      if (expiry <= new Date()) {
        errors.expiryDate = "Card has expired";
      }
    }

    if (!formData.cvv.trim()) {
      errors.cvv = "CVV is required";
    } else if (!/^\d{3}$/.test(formData.cvv)) {
      errors.cvv = "CVV must be 3 digits";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      // 1 order data
      const orderData = {
        items: [
          {
            productId: state.product.id,
            quantity: state.quantity,
            variant: state.selectedVariant,
            price: state.product.price,
          },
        ],
        customerInfo: formData,
        paymentInfo: {
          cardNumber: formData.cardNumber,
          expiry: formatExpiryDate(formData.expiryDate),
          cvv: formData.cvv,
        },
        total: state.subtotal,
      };

      // 2. Create order
      const orderResponse = await axiosBase.post("/orders", orderData);
      if (!orderResponse) {
        throw new Error("Failed to create order");
      }

      const order = orderResponse.data;
      console.log("Order created:", order);

      // 3. Process payment
      const paymentData = {
        cardNumber: formData.cardNumber,
        expiry: formatExpiryDate(formData.expiryDate),
        cvv: formData.cvv,
        amount: state.subtotal,
      };

      const paymentResponse = axiosBase.post("/payments/process", {
        orderId: order.id,
        paymentData,
      });

      if (!paymentResponse) {
        throw new Error("Payment processing failed");
      }

      const paymentResult = await (await paymentResponse).data;

      // 4. Redirect to thank you page
      navigate("/thankyou", {
        state: {
          orderNumber: order.orderNumber,
          paymentStatus: paymentResult.status,
          orderData: {
            ...order,
            paymentResult,
          },
        },
      });
    } catch (error: unknown) {
      console.error("Checkout error:", error);
      alert(error instanceof Error ? error.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (!state || !state.product) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 mb-6"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <OrderSummary
              product={state.product}
              quantity={state.quantity}
              selectedVariant={state.selectedVariant}
              subtotal={state.subtotal}
            />
            <CheckoutForm
              formData={formData}
              formErrors={formErrors}
              handleInputChange={handleInputChange}
              formatCardNumber={formatCardNumber}
              formatExpiryDate={formatExpiryDate}
              formatCvv={formatCvv}
            />
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Complete Purchase
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
