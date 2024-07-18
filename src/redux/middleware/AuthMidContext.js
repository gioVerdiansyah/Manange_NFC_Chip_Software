import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginStatus } from "../store/loginStore.js";
import { useNavigate } from "react-router-dom";
import { pathRoutes } from "../../routes/web.js";

const AuthMidContext = createContext();

const AuthProvider = ({ children }) => {
    const isAuthenticated = useSelector(state => state.loginState).isLoggedIn
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cookieName = process.env.REACT_APP_COOKIE_NAME

    useEffect(() => {
        const hasAccess = localStorage.getItem(cookieName);

        if (hasAccess) {
            dispatch(changeLoginStatus(true))
        }

        if (!hasAccess && !isAuthenticated) {
            navigate(pathRoutes.login)
        } else {
            navigate(pathRoutes.dashboard)
        }
    }, []);

    const loginUser = (token) => {
        localStorage.setItem(cookieName, token)

        dispatch(changeLoginStatus(false))
        navigate(pathRoutes.dashboard)
    };

    const logoutUser = () => {
        localStorage.removeItem(cookieName)
        dispatch(changeLoginStatus(false))
    };

    return (
        <AuthMidContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthMidContext.Provider>
    );
};

export { AuthMidContext, AuthProvider };