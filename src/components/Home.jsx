export const Home = () => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-5xl mt-14 font-bold drop-shadow-lg bg-orange-500 inline-block p-2 rounded-md">
        <span className="drop-shadow-sm">Create or Join a voting session:</span>
      </h1>
      <div className="flex justify-center">
        <div className="flex space-x-16 p-12 mt-16 bg-slate-800 rounded-md drop-shadow-lg">
          <form name="form">
            <input
              type="text"
              className="rounded-md p-2 bg-gray-200 border-2 border-orange-600 outline-none"
              autoComplete="off"
            ></input>
            <button className="bg-orange-600 rounded-md p-2 font-semibold ml-4 drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110">
              Join
            </button>
          </form>
          <button className="bg-orange-600 rounded-md p-2 font-semibold drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-orange-700 hover:-translate-y-1 hover:scale-110">
            Create vote
          </button>
        </div>
      </div>
    </section>
  );
};
