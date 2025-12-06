import { io } from "socket.io-client";

// const config = {
//   "user-agent": "Custom Ws Client",
// };

const domain = "https://gslb.site/";

export const socket = io(domain, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

socket.on("disconnect", () => {
  console.log("Disconnected from server. Handle reconnect or cleanup here.");
});
