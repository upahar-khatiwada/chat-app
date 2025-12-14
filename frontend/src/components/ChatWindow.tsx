import { useEffect, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import ChatHeader from "./ChatHeader";
import type User from "../interfaces/user_interface";
import {
  getMessagesApi,
  sendMessagePostApi,
} from "../helper/message_api_helper";
import useAuth from "../context/AuthContext";
import { getSocket } from "../socket";

interface ChatWindowProps {
  userChattingWith: User;
  setUserChattingWith: (user: User | null) => void;
}

interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
}

export default function ChatWindow({
  userChattingWith,
  setUserChattingWith,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const isSendDisabled = !message.trim();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    sendMessagePostApi(userChattingWith._id, message);
    setMessage("");
  };

  useEffect(() => {
    if (!userChattingWith?._id) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessagesApi(userChattingWith._id);
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [userChattingWith?._id]);

  useEffect(() => {
    const socket = getSocket();

    socket?.on("message", (newMessage: ChatMessage) => {
      if (
        newMessage.senderId === userChattingWith._id ||
        newMessage.receiverId === userChattingWith._id
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket?.off("message");
    };
  }, [userChattingWith._id]);

  return (
    <div className="flex-1 h-[calc(100vh-62px)] flex flex-col border rounded-2xl overflow-hidden border-none bg-white">
      <div className="bg-linear-to-r from-[#231709] to-[#4A2511] text-white">
        <ChatHeader
          userChattingWith={userChattingWith}
          setUserChattingWith={setUserChattingWith}
        />
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto bg-[#beafa3] space-y-3 scrollbar-thumb-rounded-full scrollbar-thin 
                  scrollbar-thumb-[#e7d2c7] scrollbar-track-transparent"
      >
        {messages.map((msg) => {
          const isMe = msg.senderId === user?._id;

          return (
            <div
              key={msg._id}
              className={`flex gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {!isMe && (
                <img
                  src={userChattingWith.avatar}
                  className="w-10 h-10 rounded-full mt-1"
                />
              )}
              <div
                className={`flex flex-col ${
                  isMe ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[200px] w-fit p-3 rounded-xl text-sm shadow-sm ${
                    isMe ? "bg-[#A67C52] text-white" : "bg-[#8B5E34] text-white"
                  }`}
                >
                  {msg.text}
                </div>
                <span
                  className={`text-xs opacity-70 mt-1 ${
                    isMe ? "text-white font-bold" : "text-[#6b4c2e] font-bold"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {isMe && (
                <img
                  src={user?.avatar}
                  alt="My avatar"
                  className="w-10 h-10 rounded-full mt-1"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>
          );
        })}
        {/* {demoMessages.map((msg) => (
          
        ))} */}
      </div>

      <div className="flex items-center p-3 sticky bg-[#beafa3]">
        <textarea
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          rows={1}
          className="flex-1 px-4 py-3 rounded-xl placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6c7bc]"
        />

        <button className="p-2 ml-2 cursor-pointer rounded-xl hover:bg-[#9b7d6d] transition-all duration-200">
          <MdAttachFile size={28} className="text-black" />
        </button>

        <button
          disabled={isSendDisabled}
          onClick={handleSendMessage}
          className={`p-2 ml-2 rounded-xl transition-all duration-200  ${
            isSendDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-blue-400"
          }`}
        >
          <IoMdSend size={28} className="text-black" />
        </button>
      </div>
    </div>
  );
}
