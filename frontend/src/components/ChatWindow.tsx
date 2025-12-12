import { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import ChatHeader from "./ChatHeader";

export default function ChatWindow() {
  const [message, setMessage] = useState("");

  const myAvatar: string =
    "https://tse1.mm.bing.net/th/id/OIP.J3c-uRDdRUTcstW1ygvcoQAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3";
  const otherAvatar: string =
    "https://tse1.mm.bing.net/th/id/OIP.hF_e7pA7Txs2bSIejYrR5gHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3";

  const demoMessages = [
    {
      id: 1,
      text: "Hey Jesse, how's the batch looking today? Everything on schedule?",
      from: "me",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      text: "Yo, Mr. White! It's solid, but we're short on methylamine again. Need to hit up that guy from last time?",
      from: "other",
      timestamp: "10:31 AM",
    },
    {
      id: 3,
      text: "No risks. I'll handle procurement. Focus on purity—last cook was 96%, push for 99.",
      from: "me",
      timestamp: "10:32 AM",
    },
    {
      id: 4,
      text: "Purity, yeah yeah. But seriously, the RV's making weird noises. Think it's the suspension? We can't afford a breakdown mid-cook.",
      from: "other",
      timestamp: "10:33 AM",
    },
    {
      id: 5,
      text: "Suspension? That's your job to maintain. Remember: I am the one who knocks.",
      from: "me",
      timestamp: "10:34 AM",
    },
    {
      id: 6,
      text: "Chill, Mr. White. Just saying, maybe we upgrade to something less... conspicuous. Like that story you told about the empire.",
      from: "other",
      timestamp: "10:35 AM",
    },
    {
      id: 7,
      text: "Empire? This isn't a fairy tale. Stay sharp. Distribution's heating up—Gus is watching.",
      from: "me",
      timestamp: "10:36 AM",
    },
    {
      id: 8,
      text: "Gus Fring? That chicken guy? Dude's got eyes everywhere. Last drop-off felt off—thought I saw a tail.",
      from: "other",
      timestamp: "10:37 AM",
    },
    {
      id: 9,
      text: "Paranoia will get you killed. Double-check routes next time. What's the yield projection for tonight?",
      from: "me",
      timestamp: "10:38 AM",
    },
    {
      id: 10,
      text: "Projections? With the new setup, we're looking at 200 pounds easy. But if we don't fix the vent issue, it could all go boom—literally. Remember the first time? That smell lingered for weeks, and Skyler almost caught on because of it. We gotta be smarter, not just faster.",
      from: "other",
      timestamp: "10:39 AM",
    },
    {
      id: 11,
      text: "200 pounds. Good. Vent's on me—I'll rig a better filter by noon. No more close calls.",
      from: "me",
      timestamp: "10:40 AM",
    },
    {
      id: 12,
      text: "Cool. Oh, and Walt Jr. asked about you again. Kid's obsessed with that chemistry set you got him.",
      from: "other",
      timestamp: "10:41 AM",
    },
    {
      id: 13,
      text: "Tell him Uncle Hank says hi. Family first, always.",
      from: "me",
      timestamp: "10:42 AM",
    },
    {
      id: 14,
      text: "Will do. But seriously, when are we scaling up? This garage life is cramping my style—need a real lab, not some desert tent.",
      from: "other",
      timestamp: "10:43 AM",
    },
    {
      id: 15,
      text: "Soon. Trust the process. Say my name.",
      from: "me",
      timestamp: "10:44 AM",
    },
    {
      id: 16,
      text: "Heisenberg. You're goddamn right.",
      from: "other",
      timestamp: "10:45 AM",
    },
  ];

  return (
    <div className="flex-1 h-[calc(100vh-62px)] flex flex-col border rounded-2xl overflow-hidden border-none bg-white">
      <div className="bg-linear-to-r from-[#231709] to-[#4A2511] text-white">
        <ChatHeader />
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto bg-[#beafa3] space-y-3 scrollbar-thumb-rounded-full scrollbar-thin 
                  scrollbar-thumb-[#e7d2c7] scrollbar-track-transparent"
      >
        {demoMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${
              msg.from === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.from === "other" && (
              <img src={otherAvatar} className="w-10 h-10 rounded-full mt-1" />
            )}
            <div
              className={`flex flex-col ${
                msg.from === "me" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[200px] w-fit p-3 rounded-xl text-sm shadow-sm ${
                  msg.from === "me"
                    ? "bg-[#A67C52] text-white"
                    : "bg-[#8B5E34] text-white"
                }`}
              >
                {msg.text}
              </div>
              <span
                className={`text-xs opacity-70 mt-1 ${
                  msg.from === "me"
                    ? "text-white font-bold"
                    : "text-[#6b4c2e] font-bold"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
            {msg.from === "me" && (
              <img
                src={myAvatar}
                alt="My avatar"
                className="w-10 h-10 rounded-full mt-1"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center p-3 sticky bg-[#beafa3]">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl placeholder-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d6c7bc]"
        />

        <button className="p-2 ml-2 cursor-pointer rounded-xl hover:bg-[#9b7d6d] transition-all duration-200">
          <MdAttachFile size={28} className="text-black" />
        </button>

        <button className="p-2 ml-2 rounded-xl cursor-pointer hover:bg-blue-400 transition-all duration-200">
          <IoMdSend size={28} className="text-black" />
        </button>
      </div>
    </div>
  );
}