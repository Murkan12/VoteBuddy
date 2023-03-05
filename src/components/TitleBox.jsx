export const TitleBox = ({ children }) => {
  return (
    <h1 className="text-5xl mt-14 font-bold drop-shadow-lg bg-orange-500 inline-block p-2 rounded-md">
      <span className="drop-shadow-sm">{children}</span>
    </h1>
  );
};
