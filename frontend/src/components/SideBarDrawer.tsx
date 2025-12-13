import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import type User from "../interfaces/user_interface";

const SidebarDrawer = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  // const [checkBoxTicked, setCheckBoxTicked] = useState<boolean>(false);

  // const handleCheckBoxTicked = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckBoxTicked(e.target.checked);
  // };

  useEffect(() => {
    fetch("http://localhost:3000/messages/users", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error occured while fetching a user");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(users);

  return (
    <div className="flex h-[calc(100vh-62px)] border rounded-2xl overflow-hidden border-none sticky">
      <div
        className={`bg-linear-to-r from-[#231709] to-[#4A2511] text-white py-2 transition-all duration-300 
              ${open ? "w-82" : "w-20"} flex flex-col px-2`}
      >
        <button
          className={`py-2 px-2 w-full flex items-center gap-3 cursor-pointer hover:bg-[#704026] hover:rounded-xl transition-all duration-200 ${
            !open && "justify-center"
          }`}
          onClick={() => setOpen(!open)}
        >
          <CiMenuBurger size={24} />
          {open && <span className="font-bold text-2xl">Contacts</span>}
        </button>

        {/* {open && (
          <label className="flex items-center gap-2 cursor-pointer mt-2 mx-1">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600 border-gray-300 rounded"
              onChange={handleCheckBoxTicked}
              checked={checkBoxTicked}
            />
            <span className="text-sm">Show only online users</span>
          </label>
        )} */}

        <div
          className="mt-1 flex flex-col gap-2 overflow-y-auto 
                  scrollbar-thumb-rounded-full scrollbar-thin 
                  scrollbar-thumb-[#704026] scrollbar-track-transparent"
        >
          {users
            // .filter((user) => !checkBoxTicked || user.online)
            .map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-2 p-2 hover:bg-[#704026] hover:rounded-xl transition-all duration-200 cursor-pointer relative"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
                {open && (
                  <div>
                    <p className="font-semibold">{user.fullName}</p>
                    <span className="text-sm text-gray-400">
                      Offline
                      {/* {user.online ? "Online" : "Offline"} */}
                    </span>
                  </div>
                )}
                {/* {user.online && (
                  <div className="absolute bg-green-400 border-none rounded-full w-2.5 h-2.5 bottom-3 left-9"></div>
                )} */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer;
