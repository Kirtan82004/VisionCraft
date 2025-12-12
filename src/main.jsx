import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AlertProvider } from "./hooks/AlertProvider.jsx";
import store from "./store/store.js";
import "./index.css";
import { router } from "./router/routes.jsx";
import { registerSocketListeners } from "./utils/socketListeners.jsx";

registerSocketListeners(); // ✅ initialize realtime listeners


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider>   {/* ✅ MUST wrap everything */}
        <RouterProvider router={router} />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
