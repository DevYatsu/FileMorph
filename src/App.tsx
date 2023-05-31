import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MainSection from "./components/MainSection";

function App() {
  return (
    <div className="flex flex-col w-full h-full text-black bg-gray-100 dark:text-white dark:bg-slate-900">
      <Navbar />
      <MainSection />
    </div>
  );
}

export default App;
