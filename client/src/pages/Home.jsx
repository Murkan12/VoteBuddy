import { useState } from "react";
import { ContentContainer } from "../components/ContentContainer";

import { Modal } from "../components/Modal";
import { TitleBox } from "../components/TitleBox";

export const Home = ({
  modalMsg,
  setModalMsg,
  isOpen,
  setIsOpen,
  handleFetch,
  handleNavigate,
}) => {
  const [code, setCode] = useState("");

  return (
    <section>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        {modalMsg}
      </Modal>
      <div className="flex flex-col items-center">
        <TitleBox>Create or Join a voting session:</TitleBox>
        <div className="flex justify-center">
          <ContentContainer>
            <div className="flex md:space-x-16 min-[420px]:space-x-6 p-12">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleFetch(code);
                  setModalMsg(
                    "Vote session not found. Please check if your input was correct."
                  );
                }}
                name="form"
                className="md:space-y-0 min-[420px]:space-y-4 items-center"
              >
                <input
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className="rounded-md p-2 bg-gray-200 border-2 border-orange-600 outline-none md:text-base min-[420px]:text-xs"
                  autoComplete="off"
                ></input>
                <button className="bg-orange-600 rounded-md p-2 md:text-base min-[420px]:text-xs font-semibold ml-4 drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110">
                  Join
                </button>
              </form>
              <button
                onClick={() => handleNavigate("/create")}
                className="bg-orange-600 rounded-md p-2 md:text-base min-[420px]:text-xs font-semibold drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110"
              >
                Create vote
              </button>
            </div>
          </ContentContainer>
        </div>
      </div>
    </section>
  );
};
