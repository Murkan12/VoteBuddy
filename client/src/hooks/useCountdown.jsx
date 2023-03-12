import { useEffect, useState } from "react";

export const useCountdown = (time, secToExp) => {
  const date = new Date(time);
  const expireAt = date.getTime() + secToExp;
  date.setTime(expireAt);

  const expireTime = new Date(date).getTime();

  const [countdown, setCountdown] = useState(expireTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(
      () => setCountdown(expireTime - new Date().getTime()),
      1000
    );

    return () => clearInterval(interval);
  }, [expireTime]);

  function getReturnValues(countdown) {
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);
    if (minutes >= 0 && seconds >= 0) return [minutes, seconds];
    else return [null, null];
  }

  return getReturnValues(countdown);
};
