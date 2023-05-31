import "./styles.css";

export default function FileLoader() {
  return (
    <div className="w-1/2">
      <div className="flex justify-center overflow-hidden">
        <div className="absolute w-3/5 h-2 rounded-sm sm:w-2/5 loader"></div>
      </div>
    </div>
  );
}
