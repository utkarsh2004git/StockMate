import React from "react";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="h-screen bg-white relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Background Decorations */}
      <div className="absolute w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-30 top-10 -left-20 z-0" />
      <div className="absolute w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20 bottom-0 -right-16 z-0" />

      {/* Hero Section */}
      <div className="relative z-10 flex-1 flex px-6 md:px-16 py-6 md:py-10 gap-10 md:gap-16 ">
        {/* Left Content */}
        <div className="flex-1 space-y-6">
          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
            <span className="bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text">
              Flashy, Fast,
            </span>
            <br />
            and Fully <span className="text-gray-800">Yours</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
            Track your inventory, manage orders, and simplify your daily shop operations.
          </p>

          {/* Features */}
          <ul className="text-md text-gray-700 space-y-2">
            {["Live stock updates", "Multi-user dashboard", "Order notifications"].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button className="bg-teal-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:bg-teal-600 transition-all shadow-md">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all shadow-md">
              <Play className="w-4 h-4 fill-white" /> Watch Demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 h-full flex justify-center items-center">
          <img
            src="/assets/landingImg.png"
            alt="Warehouse Illustration"
            className="h-full max-h-[90vh] w-auto object-contain drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
