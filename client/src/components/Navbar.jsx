import logo from "../assets/logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
  useAuth,
} from "@clerk/clerk-react";
import { useContext } from "react";
import { useEffect } from "react";
import { userContext } from "../context/userContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const { setUser } = useContext(userContext);
  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;
      setUser({
        ownerClerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
      const token = await getToken();

    };

    syncUser();
  }, [isSignedIn, user]);

  return (
    <div className="flex justify-between items-center mb-8 px-4 rounded-2xl shadow-md md:px-6 py-2.5 fixed top-0 left-0 right-0 bg-white z-50">
      <div className="flex items-center">
        <Link to={(isSignedIn) ? "/dashboard" : "/"}>
          <img
            src={logo}
            alt="Company Logo"
            className="w-11 h-11 rounded-full object-cover shadow-sm"
          />
        </Link>
        <span className="ml-3 text-2xl font-bold text-gray-800">StockMate</span>
      </div>

      <div className="flex space-x-4">
        <SignedOut>
          <SignInButton>
            <button className="hover:cursor-pointer border border-teal-500 text-black font-medium px-4 py-1.5 rounded-full hover:bg-teal-50 transition shadow-sm">
              Sign Up
            </button>
          </SignInButton>
          <SignInButton>
            <button className="hover:cursor-pointer bg-gray-900 text-white px-4 py-1.5 rounded-full font-medium shadow hover:bg-gray-800 transition">
              Login
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
