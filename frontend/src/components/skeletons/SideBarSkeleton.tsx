const SideBarSkeleton = ({ open = true }: { open?: boolean }) => (
  <div className="flex items-center gap-2 p-2 animate-pulse">
    <div className="w-10 h-10 rounded-full bg-[#704026]" />
    {open && (
      <div className="flex flex-col gap-1">
        <div className="w-32 h-4 rounded bg-[#704026]" />
        <div className="w-20 h-3 rounded bg-[#704026]" />
      </div>
    )}
  </div>
);

export default SideBarSkeleton;
