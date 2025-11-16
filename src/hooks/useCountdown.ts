import { useEffect } from "react";

const useCountdown = (
  targetEpoch: number | null,
  type: "dash" | "quiz",
  setCountdown: (
    val:
      | string
      | { days: number; hours: number; minutes: number; seconds: number }
  ) => void
) => {
  // COUNTDOWN TIMER LOGIC

  let days = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date(targetEpoch ? targetEpoch : Date.now());
      const currentHour = now.getHours();

      let nextQuizHour = null;
      const quizHours = [7, 9, 11, 13, 15, 17, 19]; // Quiz start hours

      if (currentHour >= 21) {
        // After 9 PM - next quiz tomorrow at 7 AM (countdown till 7 AM)
        const nextDay = new Date(targetEpoch ? targetEpoch : Date.now());
        nextDay.setDate(now.getDate() + 1);
        nextDay.setHours(7, 0, 0, 0);
        updateCountdown(nextDay, now);
        return;
      }

      if (currentHour < 5) {
        // Before 5 AM - countdown till 5 AM idle period, then 2-hour till 7 AM
        const nextTarget = new Date(targetEpoch ? targetEpoch : Date.now());
        nextTarget.setHours(7, 0, 0, 0);
        updateCountdown(nextTarget, now);
        return;
      }

      if (currentHour >= 5 && currentHour < 7) {
        // 5 AM - countdown till first quiz at 7 AM
        const nextTarget = new Date(targetEpoch ? targetEpoch : Date.now());
        nextTarget.setHours(7, 0, 0, 0);
        updateCountdown(nextTarget, now);
        return;
      }

      // Between 7 AM and 9 PM
      for (let i = 0; i < quizHours.length; i++) {
        const start = quizHours[i];
        const end = start + 2;
        if (currentHour >= start && currentHour < end) {
          // Currently in a quiz (unavailable)
          const nextTarget = new Date(targetEpoch ? targetEpoch : Date.now());
          nextTarget.setHours(end, 0, 0, 0);
          updateCountdown(nextTarget, now);
          return;
        }
        if (currentHour < start) {
          nextQuizHour = start;
          break;
        }
      }

      if (nextQuizHour === null) {
        // After last quiz before 9 PM
        const nextTarget = new Date(targetEpoch ? targetEpoch : Date.now());
        nextTarget.setHours(21, 0, 0, 0);
        updateCountdown(nextTarget, now);
      } else {
        const nextTarget = new Date(targetEpoch ? targetEpoch : Date.now());
        nextTarget.setHours(nextQuizHour, 0, 0, 0);
        updateCountdown(nextTarget, now);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const updateCountdown = (target: Date, now: Date) => {
    const diff = target.getTime() - now.getTime();
    const totalSeconds = Math.max(0, Math.floor(diff / 1000));

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    // console.log({ days, hours, minutes, seconds }, " countdown");
    setCountdown(
      type === "dash"
        ? `Next quiz in ${hours}hours ${minutes}mins ${seconds}secs`
        : { days, hours, minutes, seconds }
    );
  };
};

export default useCountdown;
