const MessageSkeleton = ({ isMe = false }: { isMe?: boolean }) => {
  return (
    <div
      className={`flex gap-2 ${
        isMe ? "justify-end" : "justify-start"
      } animate-pulse`}
    >
      {!isMe && <div className="w-10 h-10 rounded-full bg-[#9b7d6d]" />}

      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
        <div className="w-[140px] h-9 rounded-xl bg-[#9b7d6d]" />
        <div className="w-10 h-3 mt-2 rounded bg-[#9b7d6d]" />
      </div>

      {isMe && <div className="w-10 h-10 rounded-full bg-[#9b7d6d]" />}
    </div>
  );
};

export default MessageSkeleton;
