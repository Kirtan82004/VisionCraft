const StatCard = ({ title, value, icon, change, changeType }) => {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>
        <div className="text-3xl text-gray-400">{icon}</div>
      </div>

      {change && (
        <p
          className={`mt-3 text-sm ${
            changeType === "up"
              ? "text-green-600"
              : changeType === "down"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
};

export default StatCard;
