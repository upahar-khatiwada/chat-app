import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { users } from "../data/dummy_data";

const SidebarDrawer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [checkBoxTicked, setCheckBoxTicked] = useState<boolean>(false);

  const handleCheckBoxTicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxTicked(e.target.checked);
  };

  return (
    <div className="flex h-[calc(100vh-62px)]">
      <div
        className={`bg-gray-800 text-white transition-all duration-300 
              ${open ? "w-72" : "w-20"} flex flex-col px-2`}
      >
        <button
          className={`py-2 flex items-center gap-3 hover:bg-gray-700 hover:rounded-xl transition-colors duration-200 ${
            !open && "justify-center"
          }`}
          onClick={() => setOpen(!open)}
        >
          <CiMenuBurger size={24} />
          {open && <span className="font-bold text-2xl">Contacts</span>}
        </button>

        {open && (
          <label className="flex items-center gap-2 cursor-pointer mt-2 mx-1">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600 border-gray-300 rounded"
              onChange={handleCheckBoxTicked}
            />
            <span className="text-sm">Show only online users</span>
          </label>
        )}

        <div
          className="mt-4 flex flex-col gap-2 overflow-y-auto 
                  scrollbar-thumb-rounded-full scrollbar-thin 
                  scrollbar-thumb-slate-400 scrollbar-track-transparent"
        >
          {users
            .filter((user) => !checkBoxTicked || user.online)
            .map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-2 p-2 hover:bg-gray-700 hover:rounded-xl transition-all duration-200 cursor-pointer relative"
              >
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                {open && (
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <span className="text-sm text-gray-400">
                      {user.online ? "Online" : "Offline"}
                    </span>
                  </div>
                )}
                {user.online && (
                  <div className="absolute bg-green-400 border-none rounded-full w-2.5 h-2.5 bottom-3 left-9"></div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer;
