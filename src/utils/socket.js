import { io } from "socket.io-client";
import conf from "../conf/conf";

const SOCKET_URL = "https://opticalbackend-25yf.onrender.com";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  auth: {
    token: localStorage.getItem("accessToken"),
  },

});
