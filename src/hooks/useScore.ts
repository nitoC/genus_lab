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
// Store setData to use inside the handler

const useScore = (socketId: ParamValue) => {
  let currentSetter: ((data: any) => void) | null = null;
  const scoreEvent = socketId + "answer";

  const onScore = (data: any) => {
    // questions = data;
    if (currentSetter) currentSetter(data);
    console.log("Received questions:", data);
  };

  const handleConnection = (setData: (data: any) => void) => {
    currentSetter = setData;

    socket.on(scoreEvent, currentSetter);

    // RETURN CLEANUP to allow caller to unmount properly
  };
  const handleDisconnection = (setData: (data: any) => void) => {
    currentSetter = setData;

    socket.off(scoreEvent, currentSetter);

    // RETURN CLEANUP to allow caller to unmount properly
  };

  //   let questions: any;

  //   const isId = !(socketId !== sid && null);
  // const handleConnection = (setData: (data: any) => void) => {
  //   console.log(socketId, "socket id");
  //   socket.on(scoreEvent, );
  //   // setTimeout(() => {
  //   //   console.log(questions, "interval");
  //   // }, 5000);
  // };

  const handleScore = (questions: { number: number; answer: string }[]) => {
    socket.emit("score", [...questions, { id: socketId }]);
  };
  return {
    handleConnection,
    handleDisconnection,
    handleScore,
    // isId,
    // questions,
  };
};

export default useScore;
