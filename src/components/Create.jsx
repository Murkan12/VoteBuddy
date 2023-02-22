import { useState, useEffect } from "react";

export const Create = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    handleAddOption();
  }, []);

  function handleDelete(id) {
    const updatedArr = options.filter((comp) => comp.id !== id);
    console.log(updatedArr);
    setOptions(updatedArr);
  }

  function handleAddOption() {
    const randomKey = new Date().getTime();

    setOptions([...options, { id: randomKey }]);
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-5xl mt-14 font-bold drop-shadow-lg bg-orange-500 inline-block p-2 rounded-md">
        Enter up to 9 diffrent options:
      </h1>
      <div className="bg-slate-800 mt-16 rounded-md w-96 drop-shadow-lg">
        <form className="p-8" id="options-form">
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
        <div
          className={
            options.length !== 9
              ? "flex justify-between mb-3 mx-4"
              : "flex justify-center mb-3 mx-4"
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
          <button
            type="submit"
            form="options-form"
            className="bg-orange-600 font-semibold p-2 rounded-md transition ease-in-out duration-200 delay-50 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110"
          >
            Submit
          </button>
        </div>
      </div>
    </section>
  );
};
