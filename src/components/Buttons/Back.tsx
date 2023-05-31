import "./styles.css";

export default function BackButton({
  setFalse,
  setTrue,
  className,
  setTrueThenFalse,
  setNull,
  actionDone,
}: {
  setFalse?: Function;
  setTrue?: Function;
  setNull?: Function;
  setTrueThenFalse?: Function;
  actionDone?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <button
        className="back-button"
        onClick={() => {
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
          }, 500);
        }}
      >
        {actionDone ? (
          <>
            <div className="text">
              <span>Once</span>
              <span>More?</span>
            </div>
            <div className="clone">
              <span>Once</span>
              <span>More</span>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="text">
              <span>Change</span>
              <span>File</span>
            </div>
            <div className="clone">
              <span>Change</span>
              <span>File</span>
            </div>
          </>
        )}
        <svg
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </button>
    </div>
  );
}
