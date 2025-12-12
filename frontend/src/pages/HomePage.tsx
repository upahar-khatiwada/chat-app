import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/Navbar";
import SideBarDrawer from "../components/SideBarDrawer";
const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full h-[calc(100vh-62px)] overflow-hidden pt-1">
        {/* this is the sidebar */}
        <SideBarDrawer />

        <div className="w-1"></div>

        {/* this is the main chat window*/}
        <ChatWindow />

        {/* display this when no conversation selected */}
        {/* <div className="w-full flex flex-col gap-2 items-center justify-center">
          < CiChat2 size={60} className="text-white bg-gray-300 rounded-2xl p-2"/>
          <span className="text-5xl font-bold">Welcome to ChatApp!</span>
          <span className="font-semibold text-[16px]">Select a conversation to start chatting!</span>
        </div> */}
      </div>
    </>
  );
};

export default HomePage;
