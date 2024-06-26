import { useState, useEffect } from "react";

import { ContentContainer } from "../components/ContentContainer";
import { Modal } from "../components/Modal";
import { TitleBox } from "../components/TitleBox";

export const Create = ({
  title,
  setTitle,
  handleNavigate,
  modalMsg,
  setModalMsg,
  milSecRef,
}) => {
  const [value, setValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [joinButton, setJoinButton] = useState(null);

  useEffect(() => {
    setTitle("Vote Title");
  }, []);

  function handleDelete(id) {
    const updatedValue = value.filter((element) => element.id !== id);

    setValue(updatedValue);
  }

  function handleAddOption() {
    const randomKey = new Date().getTime();

    setValue([...value, { id: randomKey, option: "" }]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const optionsSet = new Set();

    if (!value.every((element) => element.option === "")) {
      const optionsArr = value.map(({ option }) => {
        if (option !== "") {
          return option;
        }
      });

      optionsArr.forEach((element) => {
        if (element !== undefined) optionsSet.add(element);
      });

      if (optionsSet.size === 1) {
        setModalMsg(
          "Incorrect number of options! Please enter at least two diffrent options."
        );
        setIsOpen(true);
      } else if (title === "") {
        setModalMsg("Please enter a title.");
        setIsOpen(true);
      } else {
        const processedOptions = [];

        optionsSet.forEach((element) => processedOptions.push(element));

        try {
          const response = await fetch(
            "https://votebuddy.onrender.com/create",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                options: processedOptions,
                title: title,
              }),
            }
          );

          const result = await response.json();

          if (!result.ok) {
            throw new Error(result.error);
          } else {
            const joinCode = result.joinCode;

            const time = new Date(result.time).getTime();

            const expireTime = new Date(
              time + milSecRef.current
            ).toLocaleTimeString();

            setModalMsg(
              <span>
                Your vote session Join Code is:{" "}
                <span className="text-green-500 font-semibold">{joinCode}</span>
                . It will expire at{" "}
                <span className="text-red-500 font-semibold">{expireTime}</span>
              </span>
            );
            setJoinButton(
              <button
                onClick={() => handleNavigate(`vote/${joinCode}`)}
                className="bg-green-500 p-1.5 mt-4 rounded-md font-semibold drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-green-600 hover:-translate-y-1 hover:scale-110"
              >
                Join Vote
              </button>
            );
            setIsOpen(true);
            setTitle("Vote Title");
            setValue([]);
          }
        } catch (error) {
          setModalMsg(`New error: ${error}`);
          setIsOpen(true);
        }
      }
    } else {
      setModalMsg(
        "Incorrect number of options! Please enter at least two diffrent options."
      );
      setIsOpen(true);
    }
  }

  return (
    <section>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        joinButton={joinButton}
      >
        {modalMsg}
      </Modal>
      <div className="flex flex-col items-center justify-center">
        <TitleBox>Enter up to 9 diffrent options:</TitleBox>
        <ContentContainer>
          <div className="flex mb-4 space-x-4 pt-4 px-4 justify-center items-center">
            <label htmlFor="title" className="text-orange-500 font-semibold">
              Enter Vote name:
            </label>
            <input
              name="title"
              type="text"
              value={title}
              maxLength="20"
              onChange={(event) => setTitle(event.target.value)}
              className="bg-gray-200 rounded-md p-1 outline-none "
            ></input>
          </div>
          {value.length > 0 && (
            <form
              action="https://votebuddy.onrender.com/create"
              method="POST"
              className="pb-8 pr-8 pl-8 pt-2"
              id="options-form"
              onSubmit={handleSubmit}
            >
              {value &&
                value.map((comp, index) => (
                  <div
                    key={comp.id}
                    className="flex mb-4 space-x-4  justify-center items-center last:mb-0 drop-shadow-lg"
                  >
                    <>
                      <label
                        className="text-orange-500 font-semibold"
                        htmlFor="option"
                      >
                        {index + 1}.
                      </label>
                      <input
                        name="option"
                        className="bg-gray-200 rounded-md p-1 outline-none"
                        autoComplete="off"
                        value={comp.option}
                        maxLength="25"
                        onChange={(event) => {
                          comp.option = event.target.value;
                          setValue([...value]);
                        }}
                      ></input>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(comp.id);
                        }}
                        className="bg-red-500 p-1.5 w-8 rounded-md font-semibold drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-red-600 hover:-translate-y-1 hover:scale-110"
                      >
                        X
                      </button>
                    </>
                  </div>
                ))}
            </form>
          )}
          <div
            className={
              value.length !== 9 && value.length !== 0
                ? "flex justify-between my-3 mx-4"
                : "flex justify-center my-3 mx-4"
            }
          >
            {value.length <= 8 && (
              <button
                onClick={handleAddOption}
                className="bg-orange-600 rounded-md p-2 font-semibold  drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110"
              >
                Add option
              </button>
            )}
            {value.length > 0 && (
              <button
                type="submit"
                form="options-form"
                className="bg-orange-600 drop-shadow-md font-semibold p-2 rounded-md transition ease-in-out duration-200 delay-50 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110"
              >
                Submit
              </button>
            )}
          </div>
        </ContentContainer>
      </div>
    </section>
  );
};
