import React, { createContext, useEffect } from "react";
import Cookie from "js-cookie";
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
        const hasAccess = Cookie.get(cookieName);

        if (hasAccess) {
            dispatch(changeLoginStatus(true))
        }

        if (!isAuthenticated) {
            navigate(pathRoutes.login)
        } else {
            navigate(pathRoutes.dashboard)
        }
    }, []);
    
    const loginUser = (token) => {
        Cookie.set(cookieName, token, { expires: 14, secure: true, sameSite: 'strict' });
        dispatch(changeLoginStatus(false))
        navigate(pathRoutes.dashboard)
    };
    
    const logoutUser = () => {
        Cookie.remove(cookieName);
        dispatch(changeLoginStatus(false))
    };

    return (
        <AuthMidContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthMidContext.Provider>
    );
};

export { AuthMidContext, AuthProvider };