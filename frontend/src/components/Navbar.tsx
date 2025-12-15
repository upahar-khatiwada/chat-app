import { CiChat2, CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router";
import { getSocket } from "../socket";
import { toast } from "sonner";
import { useState } from "react";
import { debounce } from "lodash";
import type User from "../interfaces/user_interface";

interface NavbarProps {
  onUserSelect : (user: User | null) => void;
}

const Navbar = ({ onUserSelect  }: NavbarProps) => {
  const location = useLocation();
  const [inputText, setInputText] = useState<string | null>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const fetchUsers = async (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users?search=${query}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedFetchUsers = debounce(fetchUsers, 300);

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
    debouncedFetchUsers(lowerCase);
  };

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

          <div id="search-container" className="flex relative items-center">
            <CiSearch
              size={25}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200"
            />
            <input
              type="text"
              value={inputText || ""}
              onChange={inputHandler}
              placeholder="Search for a user..."
              className="pl-10 pr-4 py-3 rounded-xl placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6c7bc]"
            />

            {searchResults.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-[#ccba9e] text-black rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    onClick={
                      () => {
                        onUserSelect(user);
                        setInputText("");
                        setSearchResults([]);
                      }
                    }
                    key={user.avatar}
                    className="px-4 py-2 flex items-center gap-2 hover:bg-gray-200 transition-all duration-100 cursor-pointer"
                  >
                    {user.avatar && (
                      <img
                        src={user.avatar}
                        alt={user.fullName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                    <span>{user.fullName}</span>
                  </div>
                ))}
              </div>
            )}
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

                const res = await fetch(
                  `${import.meta.env.VITE_BASE_URL}/auth/logout`,
                  {
                    credentials: "include",
                    method: "POST",
                  }
                );

                if (res.ok) {
                  window.location.href = "/signin";
                }

                toast("✔ Logged Out successfully");
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
