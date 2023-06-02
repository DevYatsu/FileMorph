import "./Navbar.scss";
import { FaGithub } from "react-icons/fa";
import { SiConvertio } from "react-icons/si";

function NavLogo() {
  return (
    <SiConvertio className="w-14 h-full transition rotate-[38deg] hover:rotate-[96deg] text-indigo-400" />
  );
}

function GitLink() {
  return (
    <a href="https://github.com/DevYatsu/fileMorph" target="_blank">
      <FaGithub className="w-8 h-full transition hover:scale-95" />
    </a>
  );
}

function Navbar() {
  return (
    <nav className="w-full h-24 border-gray-200 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 ">
      <div className="flex flex-wrap items-center justify-center h-full mx-auto">
        <div className="flex items-center h-full">
          <NavLogo />
          <span className="z-10 self-center pl-2 space-x-2 text-2xl font-bold tracking-wider text-transparent select-none bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600">
            FileMorph
          </span>
          <div className="absolute right-5 md:right-12">
            <GitLink />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
