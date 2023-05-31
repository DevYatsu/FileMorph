import "./Navbar.scss";

function NavLogo() {
  return (
    <img
      className="transition nav-logo h-5/6 bg-inherit rotate-12 hover:-rotate-12"
      src="/nav-logo.png"
      alt="nav-logo"
    />
  );
}

function Navbar() {
  return (
    <nav className="w-full h-24 bg-orange-200 border-gray-200 dark:bg-orange-700">
      <div className="flex flex-wrap items-center justify-center h-full mx-auto">
        <a href="#" className="flex items-center h-full">
          <NavLogo />
          <span className="self-center text-2xl font-semibold select-none whitespace-nowrap dark:text-white">
            FileMorph
          </span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
