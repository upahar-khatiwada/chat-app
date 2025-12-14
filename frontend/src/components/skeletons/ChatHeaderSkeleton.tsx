const ChatHeaderSkeleton = () => {
  return (
    <nav className="flex justify-between items-center mx-2 mt-2 mb-2 animate-pulse">
      <div className="flex gap-2 items-center p-1">
        <div className="w-10 h-10 rounded-full bg-[#9b7d6d]" />
        <div className="flex flex-col gap-1">
          <div className="w-32 h-6 rounded bg-[#9b7d6d]" />
        </div>
      </div>
    </nav>
  );
};

export default ChatHeaderSkeleton;
