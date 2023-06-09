import { useState } from "react";
import { ContentContainer } from "../components/ContentContainer";

import { Modal } from "../components/Modal";
import { TitleBox } from "../components/TitleBox";

export const Home = ({
  modalMsg,
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
            <div className="flex flex-col items-center md:flex-row p-12 justify-between h-[230px] md:h-auto md:w-[550px] md:space-x-5 w-[330px]">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleFetch(code);
                }}
                name="form"
                className=" items-center flex"
              >
                <input
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  className="rounded-md p-2 bg-gray-200 border-2 border-orange-600 outline-none"
                  autoComplete="off"
                ></input>
                <button
                  disabled={code ? false : true}
                  className="bg-orange-600 rounded-md p-2 font-semibold ml-4 drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 enabled:hover:-translate-y-1 enabled:hover:scale-110 disabled:bg-gray-500"
                >
                  Join
                </button>
              </form>
              <button
                onClick={() => handleNavigate("/create")}
                className="scale-110 w-[200px] md:w-auto md:scale-100 bg-orange-600 rounded-md p-2 font-semibold drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110"
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
