import "./Navbar.scss";
import { FaGithub } from "react-icons/fa";

function NavLogo() {
  return (
    <img
      className="transition nav-logo h-5/6 bg-inherit rotate-12 hover:-rotate-12"
      src="/nav-logo.png"
      alt="nav-logo"
    />
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
    <nav className="w-full h-24 bg-orange-200 border-gray-200 dark:bg-orange-700">
      <div className="flex flex-wrap items-center justify-center h-full mx-auto">
        <div className="flex items-center h-full">
          <NavLogo />
          <span className="self-center pl-3 text-2xl font-semibold select-none whitespace-nowrap dark:text-white">
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
