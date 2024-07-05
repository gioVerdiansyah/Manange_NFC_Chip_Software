import React from "react";
import Logo from "../../../assets/images/logo ut school.png";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { pathRoutes } from "../../../routes/web";
import fetcher from "../../../utils/fetcher";
import { apiRoutes } from "../../../routes/api";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import showConfirmAlert from "../core/ConfirmAlert";
import { IoIosInformationCircle } from "react-icons/io";
import { BsList } from "react-icons/bs";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const cookieName = process.env.REACT_APP_COOKIE_NAME;
  const handleLogout = async () => {
    showConfirmAlert({
      Icon: IoIosInformationCircle,
      yesFunc,
      title: "Are you sure to Logout?",
      description: "",
      styleType: "warning",
    });
    async function yesFunc() {
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
        toast(res?.meta?.message);
      }
    }
  };

  return (
    <div
      className="navbar bg-base-100 mb-10"
      style={{ boxShadow: "0px 0px 10px rgb(0,0,0,0.2)" }}
    >
      <ToastContainer />
      <div className="navbar-center">
        <Link to={pathRoutes.dashboard}>
          <img className="w-40 object-cover" src={Logo} alt="UT School" />
        </Link>
      </div>
      <div className="absolute right-5">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <BsList className="text-3xl font-medium" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow -translate-x-32"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/machine">Machine</Link>
            </li>
            <li>
              <button onClick={() => handleLogout()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
