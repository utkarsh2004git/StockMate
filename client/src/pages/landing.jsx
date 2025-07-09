import { ArrowRight, Play, CheckCircle } from "lucide-react";
import landingImg from "../assets/landingImg.png";

export default function Landing() {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 py-16 bg-white  relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-30 top-10 -left-20 z-0" />
      <div className="absolute w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20 bottom-0 -right-16 z-0" />

      {/* Text Content */}
      <div className="z-10 flex-1 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          <span className="bg-gradient-to-r from-teal-400 to-cyan-500 text-transparent bg-clip-text">
            Flashy, Fast,
          </span>
          <br />
          and Fully <span className="text-gray-800">Yours</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          Track your inventory, manage orders, and simplify your daily shop operations.
        </p>

        <ul className="text-md text-gray-700 space-y-2">
          {["Live stock updates", "Multi-user dashboard", "Order notifications"].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-teal-500" />
              {item}
            </li>
          ))}
        </ul>

        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <button className="bg-teal-500 text-white px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:bg-teal-600 transition-all shadow-md">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all shadow-md">
            <Play className="w-4 h-4 fill-white" /> Watch Demo
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center items-center mb-10 md:mb-0">
        <img
          src={landingImg}
          alt="Warehouse Illustration"
          className="h-auto max-h-[70vh] w-full object-contain drop-shadow-xl"
        />
      </div>
    </section>
  );
}
