import { CiChat2, CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import { getSocket } from "../socket";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-linear-to-r from-[#231709] to-[#4A2511] text-white shadow-md h-[62px]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 justify-between">
          <Link to={"/home"}>
            <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer hover:scale-105 transition-transform duration-200">
              <CiChat2 className="text-white" />
              ChatApp
            </div>
          </Link>

          <div className="flex relative items-center">
            <CiSearch
              size={25}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"
            />
            <input
              type="text"
              placeholder="Search for a user..."
              className="pl-10 pr-4 py-3 rounded-xl placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6c7bc]"
            />
          </div>

          <div className="flex items-center gap-5">
            <Link to={"/profile"}>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-lg hover:scale-105 hover:bg-[#b99a88] transition-transform duration-200 ${
                  location.pathname === "/profile"
                    ? "bg-[#9F8170] text-white"
                    : "text-yellow"
                }`}
              >
                <FaRegUser className="text-2xl" />
                <span className="text-2xl">Profile</span>
              </div>
            </Link>

            <div
              onClick={async () => {
                const socket = getSocket();

                if (socket) {
                  socket.disconnect();
                }

                const res = await fetch("http://localhost:3000/auth/logout", {
                  credentials: "include",
                  method: "POST",
                });

                if (res.ok) {
                  window.location.href = "/signin";
                }
              }}
              className="flex items-center cursor-pointer gap-1 px-3 py-1 rounded-lg hover:scale-105 transition-transform duration-200 hover:bg-red-400"
            >
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
