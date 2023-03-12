import { ContentContainer } from "../components/ContentContainer";
import { Modal } from "../components/Modal";
import { TitleBox } from "../components/TitleBox";
import { PieChart } from "../components/PieChart";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
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
  const chartTheme = [
    "#FFB84C",
    "#F16767",
    "#A459D1",
    "#5D3891",
    "#F99417",
    "#E8E2E2",
    "#F5F5F5",
  ];

  useEffect(() => {
    handleFetch(joinCode);
    const socket = io("http://localhost:8080");
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
      <div className="flex flex-col items-center">
        <TitleBox>{title}</TitleBox>
        <ContentContainer>
          <div className="flex md:flex-row min-[420px]:flex-col items-center justify-center p-4">
            <div className="h-3/5">
              <PieChart chartData={handleChartData()} />
            </div>
            <div className="flex flex-col">
              {voteOptions.map((element, index) => {
                return (
                  <div key={index}>
                    <div className="flex justify-between py-1 my-2 bg-gray-600 rounded-md">
                      <label
                        htmlFor="option"
                        className=" drop-shadow-md font-semibold text-orange-500 p-1"
                      >
                        {`${index + 1}. ${element.option}`}
                      </label>
                      <span
                        name="option"
                        className=" drop-shadow-md text-slate-100 font-semibold p-1"
                      >
                        Votes: {element.votesNum}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ContentContainer>
        {
          <div className="bg-red-500 font-semibold p-2 rounded-md mx-[30px] mb-8">
            {`Expires at: {  ${
              minutes || setTime(time, milSecRef.current)[0]
            }:${seconds || setTime(time, milSecRef.current)[1]}  }`}
          </div>
        }
      </div>
    </section>
  );
};
