export const TitleBox = ({ children }) => {
  return (
    <h1 className="w-[300px] md:w-auto md:text-5xl text-4xl mt-16 mb-10 font-bold drop-shadow-lg bg-orange-500 inline-block p-2 text-center rounded-md">
      <span className="drop-shadow-sm ">{children}</span>
    </h1>
  );
};
