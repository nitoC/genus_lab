"use client";
import { socket } from "@/lib/api/socket";
import { ParamValue } from "next/dist/server/request/params";

// Local interfaces for typing the incoming payload
interface Choice {
  id: string;
  label: string;
  [key: string]: any;
}

interface QuestionItem {
  number: number;
  question: string;
  // options: IOption;
  answer: string;
  explanation: string;
  [key: string]: any;
}

// interface QuestionPayload {
//   questions: QuestionItem[];
//   timestamp?: number;
//   source?: string;
//   [key: string]: any;
// }

const useScore = (socketId: ParamValue) => {
  //   let questions: any;

  //   const isId = !(socketId !== sid && null);
  const handleConnection = (setData: (data: any) => void) => {
    console.log(socketId, "socket id");
    socket.on(socketId + "answer", (data) => {
      console.log("Received score or answer results:", data);
      setData(data);
      // handle results here
    });
    // setTimeout(() => {
    //   console.log(questions, "interval");
    // }, 5000);
  };

  const handleScore = (questions: { number: number; answer: string }[]) => {
    socket.emit("score", [...questions, { id: socketId }]);
  };
  return {
    handleConnection,
    handleScore,
    // isId,
    // questions,
  };
};

export default useScore;
