import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
