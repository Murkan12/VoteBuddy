import { ContentContainer } from "../components/ContentContainer";

import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Results = ({ voteOptions, handleFetch, percentages }) => {
  const { joinCode } = useParams();

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
  function countPercentage() {
    const numOfVotes = voteOptions.reduce((acc, curr) => {
      return acc + curr.votesNum;
    }, 0);
    return voteOptions.map((element) => {
      return Math.round((element.votesNum / numOfVotes) * 100);
    });
  }
  return (
    <section>
      <div className="flex justify-center">
        <ContentContainer>
          <div className="flex flex-col justify-center p-4">
            {voteOptions.map((element, index) => {
              return (
                <div key={index}>
                  <div className="flex justify-between py-2">
                    <label
                      htmlFor="option"
                      className=" drop-shadow-md font-semibold text-orange-500"
                    >
                      {element.option}
                    </label>
                    <span
                      name="option"
                      className=" drop-shadow-md text-slate-100 font-semibold"
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
      </div>
    </section>
  );
};
