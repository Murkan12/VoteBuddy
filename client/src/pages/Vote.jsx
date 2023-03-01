import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ContentContainer } from "../components/ContentContainer";
import { Modal } from "../components/Modal";

export const Vote = ({
  voteOptions,
  setVoteOptions,
  handleFetch,
  isOpen,
  setIsOpen,
}) => {
  const params = useParams();

  useEffect(() => {
    handleFetch(params.joinCode);
  }, []);

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        Couldn't fetch data from server! Please try again!
      </Modal>
      <div className="flex flex-col items-center">
        <ContentContainer>
          {voteOptions.map((element, index) => {
            return (
              <div className="p-4" key={index}>
                <input name={`option-${index + 1}`} type="radio"></input>
                <label
                  htmlFor={`option-${index + 1}`}
                  className="font-semibold text-orange-500"
                >
                  {element.option}
                </label>
              </div>
            );
          })}
        </ContentContainer>
      </div>
    </section>
  );
};
