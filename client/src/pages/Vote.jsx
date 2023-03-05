import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TitleBox } from "../components/TitleBox";
import { ContentContainer } from "../components/ContentContainer";
import { Modal } from "../components/Modal";

export const Vote = ({
  voteOptions,
  handleFetch,
  isOpen,
  setIsOpen,
  handleNavigate,
  title,
}) => {
  const [value, setValue] = useState("");
  const [modalMsg, setModalMsg] = useState(
    "Couldn't fetch data from server! Please try again!"
  );

  const params = useParams();
  const joinCode = params.joinCode;

  useEffect(() => {
    handleFetch(joinCode);
  }, []);

  async function handleSubmit() {
    const response = await fetch(`http://localhost:3000/vote/${joinCode}`, {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
      method: "PATCH",
      body: `option=${value}`,
    });

    if (!response.ok) {
      setModalMsg("Server error: vote could not be saved. Please try again.");
      setIsOpen(true);
    } else {
      sessionStorage.setItem(`${joinCode}`, "voteCast");
      handleNavigate(`results/${joinCode}`);
    }
  }

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {modalMsg}
      </Modal>
      <form
        className="flex flex-col items-center"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <TitleBox>{title}</TitleBox>
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
