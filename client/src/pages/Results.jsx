import { ContentContainer } from "../components/ContentContainer";
import { Modal } from "../components/Modal";
import { TitleBox } from "../components/TitleBox";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCountdown } from "../hooks/useCountdown";
import { useFetchTIme } from "../hooks/useFetchTIme";

export const Results = ({
  voteOptions,
  handleFetch,
  percentages,
  isOpen,
  setIsOpen,
  modalMsg,
  title,
  handleNavigate,
  expireTime,
  setExpireTime,
}) => {
  const { joinCode } = useParams();

  const [minutes, seconds] = useCountdown(expireTime);

  useEffect(() => {
    handleFetch(joinCode);
    console.log(percentages);
    const socket = io("http://localhost:8080");
    socket.emit("join-room", joinCode);
    socket.on("vote-updated", (msg) => {
      handleFetch(joinCode);
      console.log(msg);
    });
  }, []);

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
          <div className="flex flex-col justify-center p-4">
            {voteOptions.map((element, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between py-2 bg-gray-600 rounded-md">
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
                      {element.votesNum}
                    </span>
                  </div>
                  {percentages && (
                    <div className="flex flex-row justify-between w-full h-5">
                      <div
                        id="percent-bar"
                        className={`bg-orange-500 h-5 w-[${
                          percentages[index] + "%"
                        }]`}
                      ></div>
                      <div className="text-slate-100 font-semibold ml-3">
                        {`${percentages[index]}%`}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ContentContainer>
        {Boolean(minutes) && (
          <div className="bg-red-500 font-semibold p-2 rounded-md mt-[-30px]">
            {`Expires at: { ${minutes}:${seconds} }`}
          </div>
        )}
      </div>
    </section>
  );
};
