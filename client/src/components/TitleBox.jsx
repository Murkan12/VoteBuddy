export const TitleBox = ({ children }) => {
  return (
    <h1 className=" md:text-5xl min-[426px]:text-2xl mt-28 font-bold drop-shadow-lg bg-orange-500 inline-block p-2 rounded-md">
      <span className="drop-shadow-sm">{children}</span>
    </h1>
  );
};
