import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import type User from "../interfaces/user_interface";
import { useAuth } from "../context/AuthContext";
import { connectSocket, getSocket } from "../socket";
import SideBarSkeleton from "./skeletons/SideBarSkeleton";
import { baseUrl } from "../config/baseurl";

interface SideBarDrawerProps {
  onChatSelect: (user: User) => void;
}

type UnreadCountsMap = Record<string, number>;

const SidebarDrawer = ({ onChatSelect }: SideBarDrawerProps) => {
  const { user } = useAuth();

  const [open, setOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [checkBoxTicked, setCheckBoxTicked] = useState<boolean>(false);
  const [unreadCounts, setUnreadCounts] = useState<UnreadCountsMap>({});

  const handleCheckBoxTicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxTicked(e.target.checked);
  };

  useEffect(() => {
    if (!user) return;

    const socket = connectSocket(user._id);

    socket.on("allOnlineUsers", (onlineUserIds: string[]) => {
      setOnlineUsers(onlineUserIds);
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();

    if (!socket) return;

    socket.emit("get-unseen-counts");

    socket.on("unseen-counts", (counts) => {
      setUnreadCounts(counts);
    });

    return () => {
      socket.off("unseen-counts");
    };
  }, [user]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("unseen-count-increment", (senderId: string) => {
      setUnreadCounts((prev) => ({
        ...prev,
        [senderId]: (prev[senderId] ?? 0) + 1,
      }));
    });

    return () => {
      socket.off("unseen-count-increment");
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/users`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Error fetching users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // console.log(users);

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

        {open && !loading && (
          <label className="flex items-center gap-2 cursor-pointer mt-2 mx-1">
            <input
              type="checkbox"
              className="w-5 h-5 accent-blue-600 border-gray-300 rounded"
              onChange={handleCheckBoxTicked}
              checked={checkBoxTicked}
            />
            <span className="text-sm">Show only online users</span>
          </label>
        )}

        <div
          className="mt-1 flex flex-col gap-2 overflow-y-auto 
                  scrollbar-thumb-rounded-full scrollbar-thin 
                  scrollbar-thumb-[#704026] scrollbar-track-transparent"
        >
          {loading
            ? Array(12)
                .fill(0)
                .map((_, i) => <SideBarSkeleton key={i} open={open} />)
            : users
                .filter(
                  (user) => !checkBoxTicked || onlineUsers.includes(user._id)
                )
                .map((user) => (
                  <div
                    onClick={() => {
                      onChatSelect(user);
                    }}
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
                          {onlineUsers.includes(user._id)
                            ? "Online"
                            : "Offline"}
                        </span>
                      </div>
                    )}
                    {unreadCounts[user._id] > 0 && (
                      <div className="absolute right-2 top-5 bg-red-500 text-white font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCounts[user._id]}
                      </div>
                    )}
                    {onlineUsers.includes(user._id) && (
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
