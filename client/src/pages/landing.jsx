// landing.jsx
import React from "react";
import { ArrowRight, Play } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-between items-center bg-white px-8 md:px-20 py-10">
      {/* Left Section */}
      <div className="max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          <span className="underline decoration-blue-500">Flashy</span>,{" "}
          <span className="underline decoration-blue-500">Fast</span>,<br />
          and Fully <span className="underline decoration-blue-500">Yours</span>
        </h1>
        <p className="mt-6 text-lg text-teal-500 font-medium">
          Track stock. Manage orders.
          <br />
          Simplify your shop life.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-white border shadow px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:shadow-md transition">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition shadow">
            <Play className="w-4 h-4 fill-white" /> Watch Demo
          </button>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="mt-12 md:mt-0">
        <img
          src="/assets/landingImg.png"
          alt="Warehouse illustration"
          className="w-full max-w-md md:max-w-xl"
        />
      </div>
    </div>
  );
}
