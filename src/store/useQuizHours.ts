import { create } from "zustand";

export const useQuizHours = create((set) => {
  return {
    hours: [7, 9, 11, 13, 15, 17, 19],
    updateQuizHours: (quizHours: any) =>
      set(() => ({
        quizHours,
      })),
  };
});
