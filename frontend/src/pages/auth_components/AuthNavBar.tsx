// This Navbar is only for signin and signup pages

import { CiChat2 } from "react-icons/ci";
import { Link, useLocation } from "react-router";

const AuthNavbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-linear-to-r from-[#231709] to-[#4A2511] text-white shadow-md h-[62px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200">
            <CiChat2 className="text-white" />
            ChatApp
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/signin"
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                location.pathname === "/signin" || location.pathname === "*"
                  ? "bg-white text-[#371d10]"
                  : "border border-white text-white hover:bg-white hover:text-[#9a7b4f]"
              }`}
            >
              Sign In
            </Link>
            {/* <Link
              to="/signup"
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                location.pathname === "/signup"
                  ? "bg-white text-[#371d10]"
                  : "border border-white text-white hover:bg-white hover:text-[#9a7b4f]"
              }`}
            >
              Sign Up
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
