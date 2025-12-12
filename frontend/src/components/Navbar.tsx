import { CiChat2 } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-linear-to-r from-indigo-500 to-purple-500 text-white shadow-md h-[62px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={"/home"}>
          <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200">
            <CiChat2 className="text-white" />
            ChatApp
          </div></Link>

          <div className="flex items-center gap-5">
            <Link to={"/profile"}>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-lg hover:scale-105 transition-transform duration-200 ${
                  location.pathname === "/profile"
                    ? "bg-gray-200 text-gray-500"
                    : "text-yellow"
                }`}
              >
                <FaRegUser className="text-2xl" />
                <span className="text-2xl">Profile</span>
              </div>
            </Link>

            <div className="flex items-center cursor-pointer gap-1 px-3 py-1 rounded-lg hover:scale-105 transition-transform duration-200 hover:bg-red-400">
              <IoIosLogOut className="text-2xl" />
              <span className="text-2xl">Log Out</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
