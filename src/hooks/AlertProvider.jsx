import React, { createContext, useContext, useState } from "react";
import Alert from "../components/Alert.jsx";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message, duration = 10000) => {
    setAlert({ type, message, duration });
  };

  const closeAlert = () => setAlert(null);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          duration={alert.duration}
          onClose={closeAlert}
        />
      )}
    </AlertContext.Provider>
  );
};