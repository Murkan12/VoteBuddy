import React, { useEffect, useState } from "react";

export const useFetchTIme = (code) => {
  const [time, setTime] = useState("");

  async function handleFetch(code) {
    const response = await fetch(`http://localhost:3000/results/time/${code}`);
    const result = await response.json();

    if (result.ok) return result.expireTime;
  }

  useEffect(() => {
    setTime(handleFetch(code));
  }, []);

  return time;
};
