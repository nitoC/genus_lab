import { io } from "socket.io-client";

// const config = {
//   "user-agent": "Custom Ws Client",
// };

const domain = "https://gslb.site";

export const socket = io(domain, {
  transports: ["websocket"],
  auth: {
    userAgent: "Custom Ws Client",
  },
  reconnectionAttempts: 5,
});

socket.on("disconnect", () => {
  console.log("Disconnected from server. Handle reconnect or cleanup here.");
});
