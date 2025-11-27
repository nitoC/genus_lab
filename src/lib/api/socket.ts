import { io } from "socket.io-client";

// Change the domain to a relative path that points to your Vercel deployment root.
// The "vercel.json" rewrite configuration handles redirecting this securely.
const domain = "/";

export const socket = io(domain, {
  auth: {
    userAgent: "Custom Ws Client",
  },
  // If your server requires explicit transport settings, you might need these,
  // but usually Vercel handles this automatically:
  // transports: ['websocket', 'polling'],
});

socket.on("connect", () => {
  console.log("Connected to server via Vercel Proxy.");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server. Handle reconnect or cleanup here.");
});
