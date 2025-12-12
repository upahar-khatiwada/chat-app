import { CiVideoOn } from "react-icons/ci";
import { IoIosCall } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const ChatHeader = () => {
  return (
    <nav className="flex justify-between items-center mx-2 mt-2 mb-2">
      <div className="flex gap-2 items-center cursor-pointer hover:bg-[#9b7d6d] hover:rounded-2xl transition-all duration-300 p-1">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.hF_e7pA7Txs2bSIejYrR5gHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3"
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">Walter White</span>
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
        />
      </div>
    </nav>
  );
};

export default ChatHeader;
