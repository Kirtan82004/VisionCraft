import { io } from "socket.io-client";
import conf from "../conf/conf";

const SOCKET_URL = "http://localhost:4000";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  auth: {
    token: localStorage.getItem("accessToken"),
  },
});