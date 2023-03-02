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
  const [value, setValue] = useState("");

  const params = useParams();
  const joinCode = params.joinCode;

  useEffect(() => {
    handleFetch(joinCode);
  }, []);

  function handleSubmit() {
    fetch(`http://localhost:3000/vote/${joinCode}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: `option=${JSON.stringify(value)}`,
    });
    console.log(value);
  }

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        Couldn't fetch data from server! Please try again!
      </Modal>
      <form
        className="flex flex-col items-center"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <ContentContainer>
          {voteOptions.map((element, index) => {
            return (
              <div className="p-4" key={index}>
                <input
                  name={`option`}
                  type="radio"
                  className=" accent-orange-500 mr-3"
                  value={element.option}
                  onChange={(event) => {
                    setValue(event.target.value);
                    console.log(value);
                  }}
                ></input>
                <label
                  htmlFor={`option`}
                  className="font-semibold text-orange-500"
                >
                  {element.option}
                </label>
              </div>
            );
          })}
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="bg-orange-600 rounded-md p-2 font-semibold drop-shadow-md transition ease-in-out duration-200 delay-50 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110"
            >
              Post Vote
            </button>
          </div>
        </ContentContainer>
      </form>
    </section>
  );
};
