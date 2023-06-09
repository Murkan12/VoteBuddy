import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TitleBox } from "../components/TitleBox";
import { ContentContainer } from "../components/ContentContainer";
import { Modal } from "../components/Modal";

import Cookies from "js-cookie";

export const Vote = ({
  voteOptions,
  handleFetch,
  isOpen,
  setIsOpen,
  handleNavigate,
  title,
  modalMsg,
  setModalMsg,
  milSecRef,
}) => {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(null);

  const params = useParams();
  const joinCode = params.joinCode;

  useEffect(() => {
    handleFetch(joinCode);
  }, []);

  async function handleSubmit() {
    const response = await fetch(
      `https://votebuddy.onrender.com/vote/${joinCode}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ option: value }),
      }
    );
    const result = await response.json();

    if (!result.ok) {
      setModalMsg(result.error || "Server error: vote could not be saved.");
      setIsOpen(true);
    } else {
      Cookies.set(joinCode, "token", {
        path: "/",
        expires: new Date(new Date().getTime() + milSecRef.current),
      });
      handleNavigate(`results/${joinCode}`);
    }
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
      <form
        className="flex flex-col items-center"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <TitleBox>{title}</TitleBox>
        <ContentContainer>
          <div className="flex flex-col items-center my-2 p-2">
            {voteOptions.map((element, index) => {
              return (
                <div
                  className={
                    selected === index
                      ? "p-2 my-1 bg-white rounded-md duration-300"
                      : "p-2 my-1 bg-gray-600 rounded-md"
                  }
                  key={index}
                >
                  <input
                    name={`option`}
                    type="radio"
                    onClick={() => {
                      setSelected(index);
                    }}
                    className=" checked:accent-orange-500 mr-3"
                    value={element.option}
                    onChange={(event) => {
                      setValue(event.target.value);
                    }}
                  ></input>
                  <label
                    htmlFor={`option`}
                    className="font-semibold text-orange-500"
                  >
                    {`${index + 1}. ${element.option}`}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center mb-4">
            <button
              type="submit"
              disabled={value ? false : true}
              className="bg-orange-600 rounded-md mt-2 p-2 font-semibold drop-shadow-md transition ease-in-out duration-200 delay-50 hover:bg-orange-700 enabled:hover:-translate-y-1 enabled:hover:scale-110 disabled:bg-gray-500"
            >
              Post Vote
            </button>
          </div>
        </ContentContainer>
      </form>
    </section>
  );
};
