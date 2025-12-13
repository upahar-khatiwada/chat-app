import { useState } from "react";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/Navbar";
import SideBarDrawer from "../components/SideBarDrawer";
import { CiChat2 } from "react-icons/ci";
import type User from "../interfaces/user_interface";

const HomePage = () => {
  const [selectedChat, setSelectedChat] = useState<User | null>(null);

  return (
    <>
      <Navbar />
      <div className="flex w-full h-[calc(100vh-62px)] overflow-hidden pt-1">
        {/* this is the sidebar */}
        <SideBarDrawer onChatSelect={setSelectedChat}/>

        <div className="w-1"></div>

        <div className="flex-1">
          {selectedChat ? (
            <ChatWindow userChattingWith={selectedChat} setUserChattingWith={setSelectedChat} />
          ) : (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <CiChat2
                size={60}
                className="text-white bg-gray-300 rounded-2xl p-2"
              />
              <span className="text-5xl font-bold">Welcome to ChatApp!</span>
              <span className="font-semibold text-[16px]">
                Select a conversation to start chatting!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
