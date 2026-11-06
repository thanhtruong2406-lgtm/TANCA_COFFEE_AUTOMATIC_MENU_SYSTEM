import { useState } from "react";

const STORAGE_KEY = "tanca-intro-completed";

export default function useIntro() {
  const [started, setStarted] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  });

  const startExperience = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setStarted(true);
  };

  const replayIntro = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setStarted(false);
  };

  return {
    started,
    startExperience,
    replayIntro,
  };
}
