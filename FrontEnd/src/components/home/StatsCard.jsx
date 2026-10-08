const StatsCard = ({ count, label }) => {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 border border-gray-400 rounded-full text-[11px] tracking-[0.08em] font-mono text-gray-700 bg-white ">
      <div className="font-extrabold text-gray-900 ">{count}</div>
      <span>{label}</span>
    </div>
  );
};

export default StatsCard;
