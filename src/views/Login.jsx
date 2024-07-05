import { useDispatch, useSelector } from "react-redux";
import { logoUTSDark, logoUTSWhite } from "../assets/index.js";
import { changeTheme } from "../redux/store/themeStore.js";
import "../App.css";
import { z } from "zod";
import {
  setLoginDataInput,
  setLoginErrorFields,
} from "../redux/store/loginStore.js";
import InputLabelComponent from "./components/core/InputLabel.jsx";
import { useContext } from "react";
import { AuthMidContext } from "../redux/middleware/AuthMidContext.js";
import fetcher from "../utils/fetcher.js";
import { apiRoutes } from "../routes/api.js";
import LoadingAnimation from "./components/core/LoadingAnimation.jsx";
import { setLoading } from "../redux/store/trueOrFalseStore.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export function LoginView() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeState);
  const fields = useSelector((state) => state.loginState).fields;
  const errorField = useSelector((state) => state.loginState).errorFields;
  const isLoading = useSelector((state) => state.trueOrFalseState).isLoading;
  const { loginUser } = useContext(AuthMidContext);

  const loginSchema = z.object({
    email: z.string().email().nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    dispatch(setLoginDataInput({ [name]: value }));
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(fields);
    if (!result.success) {
      const errors = result.error.formErrors.fieldErrors;
      console.log(errors);
      dispatch(setLoginErrorFields(errors));
    } else {
      dispatch(setLoading(true));
      const res = await fetcher(apiRoutes.login, {
        method: "POST",
        body: JSON.stringify(fields),
      });
      setTimeout(() => {
        dispatch(setLoading(false));
        console.log(res);
        if(res?.meta?.isSuccess){
          loginUser(res?.data)
          toast.success(res?.meta?.message, { autoClose: 5000 });
        }else{
          toast.error(res?.meta?.message, { autoClose: 5000 });
        }
      }, 2000);
    }
  };

  return (
    <main className="w-screen h-screen">
      <ToastContainer />
      <div className="dark-light-mode-toggle absolute right-3 top-3">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() => dispatch(changeTheme(theme))}
            defaultChecked={theme === "emerald" ? true : false}
          />
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="card card-compact bg-base-100 w-96 shadow-xl shadow-gray-400">
          <form
            className="p-3 flex flex-col justify-center items-center"
            onSubmit={handleSubmitData}
          >
            <img
              src={theme === "emerald" ? logoUTSDark : logoUTSWhite}
              className={theme === "emerald" ? "w-44" : "w-40"}
              alt="UTS logo"
            />
            <div className="flex flex-col">
              <InputLabelComponent
                labelName="Email"
                type="email"
                name="email"
                placeholder="Enter Admin Email"
                labelClassName="self-start"
                defaultValue={fields.email}
                error={errorField.email.length > 0}
                errorMessage={errorField.email}
                onChangeEvent={handleChangeInput}
              />
            </div>
            <div className="mt-3 mb-3 flex flex-col">
              <InputLabelComponent
                labelName="Password"
                type="password"
                name="password"
                placeholder="Enter Admin Password"
                labelClassName="self-start"
                defaultValue={fields.password}
                error={errorField.password.length > 0}
                errorMessage={errorField.password}
                onChangeEvent={handleChangeInput}
              />
            </div>
            {/* {isLoading && } */}
            <div className="mt-3 mb-3 flex flex-row items-center">
              {isLoading ? (
                <div>
                  <LoadingAnimation className="w-14" />{" "}
                  <p className="font-bold ms-3">Loading...</p>
                </div>
              ) : (
                <button className="btn btn-outline rounded-md btn-primary">
                  Login
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
