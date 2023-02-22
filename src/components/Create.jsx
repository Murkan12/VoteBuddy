import { useState, useEffect } from "react";

export const Create = () => {
  const [count, setCount] = useState(1);
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
    const randomKey = Math.floor(Math.random() * 1000);
    setCount(count + 1);

    setOptions([...options, { id: randomKey }]);
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-5xl mt-14 font-bold drop-shadow-lg bg-orange-500 inline-block p-2 rounded-md">
        Enter up to 9 diffrent options:
      </h1>
      <div className="bg-slate-800 mt-16 rounded-md w-96">
        <form className="p-8">
          {options &&
            options.map((comp) => (
              <div
                key={comp.id}
                className="flex mb-4 space-x-4  justify-center items-center last:mb-0"
              >
                <>
                  {/* <label htmlFor="option">{count}.</label> */}
                  <input
                    name="option"
                    className="bg-gray-200 rounded-md p-1"
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
        {options.length <= 8 && (
          <button
            onClick={handleAddOption}
            className="bg-orange-600 rounded-md mb-3 p-2 font-semibold ml-4 drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110"
          >
            Add option
          </button>
        )}
      </div>
    </section>
  );
};
