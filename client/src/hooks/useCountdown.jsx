import { useEffect, useState } from "react";

export const useCountdown = (date) => {
  const time = new Date(date).getTime();

  const [countdown, setCountdown] = useState(time - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown(time - new Date().getTime()),
      1000
    );

    return () => clearInterval(interval);
  }, [time]);

  function getReturnValues(countdown) {
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    return [minutes, seconds];
  }

  return getReturnValues(countdown);
};
