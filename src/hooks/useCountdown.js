import { useEffect, useState } from "react";
import { weddingDate } from "../data/wedding";

function getCountdown() {
  const difference = Math.max(
    0,
    weddingDate.getTime() - Date.now()
  );

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function formatNumber(value) {
  return String(value).padStart(2, "0");
}

export default function useCountdown(active = true) {
  const [countdown, setCountdown] = useState(getCountdown);

  useEffect(() => {
    if (!active) return;

    setCountdown(getCountdown());

    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(interval);
  }, [active]);

  return countdown;
}