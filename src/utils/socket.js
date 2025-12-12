import { io } from "socket.io-client";
import conf from "../conf/conf";

const SOCKET_URL = "https://visioncraftbackend.onrender.com";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  auth: {
    token: localStorage.getItem("accessToken"),
  },
  transports: ["polling", "websocket"],
});



