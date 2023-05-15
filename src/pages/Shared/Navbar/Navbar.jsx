import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../providers/AuthProvider";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleToLogOut = () => {
    logOut()
      .then((result) => {
        // remove when logout an user
        // localStorage.removeItem("car-access-token");
      })
      .catch((error) => console.log(error.message));
  };

  const navItems = (
    <>
      <li className="text-xl font-medium">
        <Link to="/">Home</Link>
      </li>
      <li className="text-xl font-medium">
        <Link to="/about">About</Link>
      </li>
      <li className="text-xl font-medium">
        <Link to="/services">Services</Link>
      </li>
      <li className="text-xl font-medium">
        <Link to="/blog">Blog</Link>
      </li>
      <li className="text-xl font-medium">
        <Link to="/contact">Contact</Link>
      </li>

      {user?.email ? (
        <>
          <li className="text-xl font-medium">
            <Link to="/bookings">My Bookings</Link>
          </li>
          <li onClick={handleToLogOut} className="text-xl font-medium">
            <Link>Log out</Link>
          </li>
        </>
      ) : (
        <li className="text-xl font-medium">
          <Link to="/login">Log In</Link>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 my-12">
        <div className="navbar-start justify-between lg:justify-normal">
          <Link to="/" className="">
            <img src={logo} alt="logo" />
          </Link>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul className="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box mx-auto w-52 ">
              {navItems}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <button className="btn btn-outline btn-warning text-xl capitalize">
            Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
