import React from "react";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <div className="relative bg-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-35"
        />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Experience Next-Level Tech
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg animate-fade-in-delay">
            Discover the latest cutting-edge gadgets and electronics with
            exceptional quality and unbeatable prices.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-delay-longer">
            <a
              href="#products"
              className="bg-white text-indigo-900 hover:bg-indigo-50 px-6 py-3 rounded-md font-semibold transition-all duration-200 flex items-center"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
