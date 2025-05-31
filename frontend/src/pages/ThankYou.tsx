import { useLocation, useNavigate } from "react-router-dom";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { orderNumber: string };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <div className="text-6xl text-green-600 mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order {state.orderNumber} has been placed successfully.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
