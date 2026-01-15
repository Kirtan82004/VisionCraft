import React, { useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

const Alert = ({
  type = "info",
  message,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      bg: "bg-green-500",
      icon: <CheckCircle size={20} />,
    },
    error: {
      bg: "bg-red-500",
      icon: <XCircle size={20} />,
    },
    warning: {
      bg: "bg-yellow-500",
      icon: <AlertTriangle size={20} />,
    },
    info: {
      bg: "bg-blue-500",
      icon: <Info size={20} />,
    },
  };

  return (
    <div
      className={`fixed top-20 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-lg text-white shadow-xl
      animate-slide-in ${config[type].bg}`}
    >
      {config[type].icon}

      <span className="text-sm font-medium">{message}</span>

      <button
        onClick={onClose}
        className="ml-2 hover:opacity-80"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Alert;
