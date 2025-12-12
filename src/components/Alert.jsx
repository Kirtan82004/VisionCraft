import React, { useEffect } from "react";

const Alert = ({ type = "info", message, onClose, duration = 3000 }) => {
    console.log("Alert rendered with message:", message);
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-3 rounded-md text-white shadow-lg transition-all ${colors[type]}`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Alert;