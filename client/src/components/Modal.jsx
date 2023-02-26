import { ContentContainer } from "./ContentContainer";
import ReactDOM from "react-dom";

export const Modal = ({ onClose, open, isOpen }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="flex flex-row items-center justify-center">
      <div
        className={`bg-black opacity-60
           fixed top-0 left-0 right-0 bottom-0 z-40`}
      ></div>
      <div className="z-50 bg-slate-800 rounded-md w-3/5 drop-shadow-lg p-10 fixed top-56 flex flex-col justify-center items-center">
        <p className="text-center font-semibold text-orange-500 drop-shadow-lg">
          Incorrect number of options! Please enter at least two diffrent
          options.
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 p-1.5 w-8 mt-4 rounded-md font-semibold drop-shadow-md transition ease-in-out delay-50 duration-200 hover:bg-red-600 hover:-translate-y-1 hover:scale-110"
        >
          OK
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};
