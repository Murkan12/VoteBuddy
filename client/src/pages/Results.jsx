import { Modal } from "../components/Modal";
import { TitleBox } from "../components/TitleBox";
import { PieChart } from "../components/PieChart";
import { chartTheme } from "../colors/chartTheme";

import { io } from "socket.io-client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCountdown } from "../hooks/useCountdown";

export const Results = ({
  voteOptions,
  handleFetch,
  isOpen,
  setIsOpen,
  modalMsg,
  title,
  handleNavigate,
  time,
  handleExpire,
  milSecRef,
}) => {
  const { joinCode } = useParams();

  useEffect(() => {
    handleFetch(joinCode);
    const socket = io("https://votebuddy.onrender.com:4000");
    socket.emit("join-room", joinCode);
    socket.on("vote-updated", (msg) => {
      handleFetch(joinCode);
      console.log(msg);
    });
  }, []);

  function setTime(time, toExpire) {
    const date = new Date(time);
    const expireTime = date.getTime() + toExpire - new Date().getTime();

    const minutes = Math.floor((expireTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((expireTime % (1000 * 60)) / 1000);

    if (minutes >= 0 && seconds >= 0) {
      return [minutes, seconds];
    } else return [0, 0];
  }

  function handleChartData() {
    const data = {
      labels: voteOptions.map((element) => element.option),
      datasets: [
        {
          label: "Number of votes",
          data: voteOptions.map((element) => element.votesNum),
          backgroundColor: [...chartTheme],
        },
      ],
    };
    return data;
  }

  function handleColors(index) {
    switch (index) {
      case 0:
        return `flex justify-between py-1 my-2 bg-[#FFB84C] rounded-md`;
      case 1:
        return `flex justify-between py-1 my-2 bg-[#F16767] rounded-md`;
      case 2:
        return `flex justify-between py-1 my-2 bg-[#A459D1] rounded-md`;
      case 3:
        return `flex justify-between py-1 my-2 bg-[#5D3891] rounded-md`;
      case 4:
        return `flex justify-between py-1 my-2 bg-[#F99417] rounded-md`;
      case 5:
        return `flex justify-between py-1 my-2 bg-[#7DB9B6] rounded-md`;
      case 6:
        return `flex justify-between py-1 my-2 bg-[#E96479] rounded-md`;
      case 7:
        return `flex justify-between py-1 my-2 bg-[#146C94] rounded-md`;
      case 8:
        return `flex justify-between py-1 my-2 bg-[#42855B] rounded-md`;
    }
  }

  const [minutes, seconds] = useCountdown(time, milSecRef.current);

  if (minutes === 0 && seconds === 0) {
    handleExpire(joinCode);
  }

  return (
    <section>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          handleNavigate("/");
        }}
      >
        {modalMsg}
      </Modal>
      <div className="flex flex-col items-center m-auto">
        <TitleBox>{title}</TitleBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 md:w-[800px]">
          <div className="bg-slate-800 rounded-md drop-shadow-lg min-w-[300px] md:min-w-[150px] flex justify-center items-center max-h-[400px]">
            <div className="h-[320px] md:h-[420px] flex justify-center items-center p-2">
              <PieChart chartData={handleChartData()} />
            </div>
          </div>

          <div className="bg-slate-800 rounded-md drop-shadow-lg min-w-[300px] md:min-w-[150px] p-2 flex justify-center">
            <div className="flex flex-col justify-center items-center">
              {voteOptions.map((element, index) => {
                return (
                  <div key={index}>
                    <div className={handleColors(index)}>
                      <label
                        htmlFor="option"
                        className="text-center drop-shadow-lg font-semibold text-white p-3"
                      >
                        {`${index + 1}. ${element.option}`}
                      </label>
                      <span
                        name="option"
                        className="text-center drop-shadow-lg text-slate-100 font-semibold p-3"
                      >
                        Votes: {element.votesNum}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {
          <div className="bg-red-500 font-semibold p-2 rounded-md mx-[30px] mb-8 mt-12">
            {`Expires at: {  ${
              minutes || setTime(time, milSecRef.current)[0]
            }:${seconds || setTime(time, milSecRef.current)[1]}  }`}
          </div>
        }
      </div>
    </section>
  );
};
