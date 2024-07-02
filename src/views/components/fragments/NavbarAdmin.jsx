import React from "react";
import Logo from "../../../assets/images/logo ut school.png";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { pathRoutes } from "../../../routes/web";
import fetcher from "../../../utils/fetcher";
import { apiRoutes } from "../../../routes/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const cookieName = process.env.REACT_APP_COOKIE_NAME;
  const handleLogout = async () => {
    const res = await fetcher(apiRoutes.logout, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Cookie.get(cookieName),
      },
    });
    if (res?.meta?.isSuccess) {
      Cookie.remove(cookieName);
      navigate(pathRoutes.login);
    } else {
      toast(res?.meta?.message)
    }
  };

  return (
    <div className="navbar bg-base-100">
      <ToastContainer />
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/machine">Machine</Link>
            </li>
            <li>
              <Link to="/log-activity">Activity</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <img className="w-40 object-cover" src={Logo} alt="UT School" />
      </div>
      <div className="navbar-end">
        <button onClick={() => handleLogout()} className="btn btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
