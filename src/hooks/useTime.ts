import { socket } from "@/lib/api/socket";
import { useEffect } from "react";

export const useTime = (
  socketId: string,
  handleTimerUpdate: (data: number) => void
) => {
  const timeListener = (epoch: number) => {
    console.log("Server Time Epoch:", epoch);
    handleTimerUpdate(epoch);
  };

  socket.on(`${socketId}time`, timeListener);

  useEffect(() => {
    if (!socketId) return;

    // Trigger time sync
    socket.emit("time", socketId);

    return () => {
      socket.off(`${socketId}time`, timeListener);
    };
  }, [socketId]);
};
