export const ContentContainer = ({ children }) => {
  return (
    <div className="bg-slate-800 rounded-md drop-shadow-lg max-w-[330px] md:max-w-[600px] md:min-w-[150px]">
      {children}
    </div>
  );
};
