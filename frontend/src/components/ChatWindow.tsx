import { useEffect, useRef, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import ChatHeader from "./ChatHeader";
import type User from "../interfaces/user_interface";
import {
  getMessagesApi,
  sendMessagePostApi,
} from "../helper/message_api_helper";
import { useAuth } from "../context/AuthContext";
import { getSocket } from "../socket";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeaderSkeleton from "./skeletons/ChatHeaderSkeleton";
import { toast } from "sonner";

interface ChatWindowProps {
  userChattingWith: User;
  setUserChattingWith: (user: User | null) => void;
}

interface ChatMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image: string;
  createdAt: string;
}

export default function ChatWindow({
  userChattingWith,
  setUserChattingWith,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]); // it has all messages between two users
  const [message, setMessage] = useState(""); // this is the input text box's message
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();

  const isSendDisabled = !message.trim();

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedImage) return;

    const imageToSend = selectedImage;
    setSelectedImage(undefined);
    const textToSend = message;
    setMessage("");

    try {
      const res: ChatMessage = await sendMessagePostApi(
        userChattingWith._id,
        textToSend,
        imageToSend
      );
      setMessages((prev) => [...prev, res]);
    } catch (err) {
      console.error(err);
      toast("❌ Failed to send message");
      setSelectedImage(imageToSend);
      setMessage(textToSend);
    }
  };

  const handleSendImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast("❌ Only image files allowed");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  // fetches the messages between two users
  useEffect(() => {
    if (!userChattingWith?._id) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const data = await getMessagesApi(userChattingWith._id);
        setMessages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userChattingWith?._id]);

  // appends the new messages between two users
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

  // scrolls to the latest message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 h-[calc(100vh-62px)] flex flex-col border rounded-2xl overflow-hidden border-none bg-white">
      <div className="bg-linear-to-r from-[#231709] to-[#4A2511] text-white">
        {loading ? (
          <ChatHeaderSkeleton />
        ) : (
          <ChatHeader
            userChattingWith={userChattingWith}
            setUserChattingWith={setUserChattingWith}
          />
        )}
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto bg-[#beafa3] space-y-3 scrollbar-thumb-rounded-full scrollbar-thin 
                  scrollbar-thumb-[#e7d2c7] scrollbar-track-transparent"
      >
        {loading ? (
          <>
            <MessageSkeleton />
            <MessageSkeleton isMe />
            <MessageSkeleton />
            <MessageSkeleton isMe />
            <MessageSkeleton />
          </>
        ) : (
          messages.map((msg) => {
            const isMe = msg.senderId === user?._id;

            return (
              <div
                key={msg._id}
                className={`flex gap-2 ${
                  isMe ? "justify-end" : "justify-start"
                }`}
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
                      isMe
                        ? "bg-[#A67C52] text-white"
                        : "bg-[#8B5E34] text-white"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Attachment"
                        className="sm:max-w-[180px] rounded-md mb-2"
                      />
                    )}
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
          })
        )}
        <div ref={messageEndRef} />
      </div>

      <div className="flex items-center p-3 sticky bg-[#beafa3]">
        {selectedImage && (
          <div className="relative m-2 w-32 h-32 border rounded-xl flex items-center justify-center">
            <img
              src={selectedImage}
              className="w-28 h-28 object-cover rounded-xl"
              alt="Preview"
            />
            <button
              onClick={() => setSelectedImage(undefined)}
              className="cursor-pointer absolute -top-2 -right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-400 transition-all duration-200"
            >
              ✕
            </button>
          </div>
        )}
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

        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 ml-2 cursor-pointer rounded-xl hover:bg-[#9b7d6d] transition-all duration-200"
        >
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

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleSendImage}
      />
    </div>
  );
}
