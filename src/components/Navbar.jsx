import { useState, useContext } from "react";
import { RiCloseLine, RiMenuFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/plantinfo", label: "Plants" },
  { to: "/plantdetect", label: "Detect" },
  { to: "/aboutus", label: "About Us" },
  { to: "/contactus", label: "Contact Us" },
  { to: "/explore", label: "Explore" },
];

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white py-4 z-50 shadow-md">
      <nav className="container mx-auto flex justify-between items-center px-4 ">
        {/* Logo */}
        <div className="flex items-center">
        <img
          src=".\src\assets\logo.png"
          alt="Community"
          className="w-10 h-10 object-cover rounded-lg m-4"
        /><div className="ml-3">
         
            <p className="text-lg font-semibold text-black">Anvaya</p>
            <p className="text-sm text-gray-800">by The Stoics</p>
          </div>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-4">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-400 underline"
                    : "hover:text-orange-400 transition"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Buttons - Conditionally Rendered */}
        {!isAuthenticated ? (
          <div className="hidden md:flex gap-4">
            <button className="bg-gray-900  px-4 py-2 rounded hover:bg-white">
              <a href="/login" className="text-white  ">
                Login
              </a>
            </button>
            <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-400">
              <a href="/register">Sign Up</a>
            </button>
          </div>
        ) : (
          <div className="hidden md:flex gap-4 items-center">
            <span className="text-orange-400">
              Welcome, {user?.name || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="text-white bg-gray-00 px-4 py-2 rounded hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleNav}
          className="md:hidden text-2xl focus:outline-none bg-white"
        >
          {isNavOpen ? <RiCloseLine /> : <RiMenuFill />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="md:hidden bg-white py-4">
          <ul className="flex flex-col gap-4 px-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-orange-400 underline"
                      : "hover:text-orange-400 transition"
                  }
                  onClick={toggleNav}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          {!isAuthenticated ? (
            <div className="mt-4 px-4 flex flex-col gap-4">
              <button className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-600">
                <a href="/login">Login</a>
              </button>
              <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-400">
                <a href="/register">Sign Up</a>
              </button>
            </div>
          ) : (
            <div className="mt-4 px-4 flex flex-col gap-4">
              <span className="text-orange-400 text-center">
                Welcome, {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
