import { io } from "socket.io-client";

// const config = {
//   "user-agent": "Custom Ws Client",
// };

const domain = "https://gslb.site";

export const socket = io(domain, {
  auth: {
    userAgent: "Custom Ws Client",
  },
});

socket.on("disconnect", () => {
  console.log("Disconnected from server. Handle reconnect or cleanup here.");
});
