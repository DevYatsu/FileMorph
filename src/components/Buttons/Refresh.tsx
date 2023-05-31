import { useState } from "react";

export default function RefreshButton({
  setFalse,
  setTrue,
  className,
  setTrueThenFalse,
  setNull,
}: {
  setFalse?: Function;
  setTrue?: Function;
  setNull?: Function;
  setTrueThenFalse?: Function;
  className?: string;
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => {
          setIsRefreshing(true);
          if (setTrueThenFalse) {
            setTrueThenFalse(true);
          }
          setTimeout(() => {
            if (setFalse) {
              setFalse(false);
            }
            if (setTrue) {
              setTrue(true);
            }
            if (setNull) {
              setNull(null);
            }
            if (setTrueThenFalse) {
              setTrueThenFalse(false);
            }
            setIsRefreshing(false);
          }, 1500);
        }}
        className="inline-flex items-center justify-center w-auto px-3 py-2 space-x-2 text-sm font-medium text-white transition border rounded appearance-none cursor-pointer select-none bg-violet-700 border-violet-700 hover:border-violet-800 hover:bg-violet-800 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:pointer-events-none disabled:opacity-75 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
        <span>{isRefreshing ? "Refreshing..." : "Refresh ?"}</span>
      </button>
    </div>
  );
}
