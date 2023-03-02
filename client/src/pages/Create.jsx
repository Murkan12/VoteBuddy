import { useState, useEffect } from "react";

import { ContentContainer } from "../components/ContentContainer";
import { Modal } from "../components/Modal";
import { TitleBox } from "../components/TitleBox";

export const Create = () => {
  const [modalMssg, setModalMssg] = useState(
    "Incorrect number of options! Please enter at least two diffrent options."
  );
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   handleAddOption();
  // }, []);

  function handleDelete(id) {
    const updatedArr = options.filter((comp) => comp.id !== id);
    const updatedValue = value.filter((element) => element.id !== id);

    console.log(updatedArr);
    setValue(updatedValue);
    setOptions(updatedArr);
  }

  function handleAddOption() {
    const randomKey = new Date().getTime();

    setValue([...value, { id: randomKey, option: "" }]);
    setOptions([...options, { id: randomKey }]);

    console.log(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const optionsSet = new Set();

    console.log(value);

    if (!value.every((element) => element.option === "")) {
      const optionsArr = value.map(({ option }) => {
        if (option !== "") {
          return option;
        }
      });

      console.log(optionsArr);

      optionsArr.forEach((element) => {
        if (element !== undefined) optionsSet.add(element);
      });

      if (optionsSet.size === 1) {
        setIsOpen(true);
      } else {
        const processedOptions = [];

        optionsSet.forEach((element) => processedOptions.push(element));

        console.log(processedOptions);

        fetch("http://localhost:3000/create", {
          method: "POST",
          mode: "cors",
          cache: "default",
          credentials: "same-origin",
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
          body: `options=${JSON.stringify(processedOptions)}`,
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`HTTP error ${response.status}`);
            } else {
              const joinCode = await response.json();
              setModalMssg(`Your vote session Join Code is: ${joinCode}`);
              setIsOpen(true);
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      setIsOpen(true);
    }
  }

  return (
    <section>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setModalMssg(
            "Incorrect number of options! Please enter at least two diffrent options."
          );
        }}
        isOpen={isOpen}
      >
        {modalMssg}
      </Modal>
      <div className="flex flex-col items-center justify-center">
        <TitleBox>Enter up to 9 diffrent options:</TitleBox>
        <ContentContainer>
          {options.length > 0 && (
            <form
              action="http://localhost:3000/create"
              method="POST"
              className="p-8"
              id="options-form"
              onSubmit={handleSubmit}
            >
              {options &&
                options.map((comp, index) => (
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
                        value={value[index].option}
                        onChange={(event) => {
                          value[index].option = event.target.value;
                          setValue([...value]);
                        }}
                      ></input>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(comp.id);
                          value[index].option = "";
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
              options.length !== 9 && value.length !== 0
                ? "flex justify-between my-3 mx-4"
                : "flex justify-center my-3 mx-4"
            }
          >
            {options.length <= 8 && (
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
