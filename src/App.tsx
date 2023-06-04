import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MainSection from "./components/MainSection";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("selectstart", (e) => e.preventDefault());

    return () => {
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
      document.removeEventListener("selectstart", (e) => e.preventDefault());
    };
  }, []);

  return (
    <div className="flex flex-col w-full h-full text-black bg-gray-100 dark:text-white dark:bg-slate-900">
      <Navbar />
      <MainSection />
    </div>
  );
}

export default App;
