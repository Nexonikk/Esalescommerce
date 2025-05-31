import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 flex items-center gap-2"
          >
            <ShoppingBag className="h-7 w-7" />
            <span>Esalescom</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
