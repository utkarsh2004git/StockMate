import logo from "../assets/logo.png";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center mb-8 px-4 rounded-2xl shadow-md md:px-6 py-2.5 fixed top-0 left-0 right-0 bg-white z-50">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Company Logo"
                    className="w-11 h-11 rounded-full object-cover shadow-sm"
                />
                <span className="ml-3 text-2xl font-bold text-gray-800">StockMate</span>
            </div>

            <div className="flex space-x-4">
                <button className="hover:cursor-pointer border border-teal-500 text-black font-medium px-4 py-1.5 rounded-full hover:bg-teal-50 transition shadow-sm">
                    Sign Up
                </button>
                <button className="hover:cursor-pointer bg-gray-900 text-white px-4 py-1.5 rounded-full font-medium shadow hover:bg-gray-800 transition">
                    Login
                </button>
            </div>
        </div>

    );
}
