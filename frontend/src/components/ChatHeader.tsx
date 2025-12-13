import { CiVideoOn } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import type User from "../interfaces/user_interface";

interface ChatHeaderProps {
  userChattingWith: User;
  setUserChattingWith: (user: User | null) => void;
}

const ChatHeader = ({
  userChattingWith,
  setUserChattingWith,
}: ChatHeaderProps) => {
  return (
    <nav className="flex justify-between items-center mx-2 mt-2 mb-2">
      <div className="flex gap-2 items-center cursor-pointer hover:bg-[#9b7d6d] hover:rounded-2xl transition-all duration-300 p-1">
        <img
          src={userChattingWith.avatar}
          className="w-10 h-10 rounded-full"
          referrerPolicy="no-referrer"
        />
        <span className="font-semibold">{userChattingWith.fullName}</span>
      </div>

      <div className="flex gap-2">
        <IoIosCall
          size={40}
          className="p-2 cursor-pointer hover:bg-[#b99a88] hover:rounded-2xl transition-all duration-200"
        />
        <CiVideoOn
          size={40}
          className="p-2 cursor-pointer hover:bg-[#b99a88] hover:rounded-2xl transition-all duration-200"
        />
        <IoClose
          size={40}
          className="p-2 cursor-pointer hover:bg-red-400 hover:rounded-2xl transition-all duration-200"
          onClick={() => setUserChattingWith(null)}
        />
      </div>
    </nav>
  );
};

export default ChatHeader;
