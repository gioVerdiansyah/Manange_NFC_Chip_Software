import React, { createContext, useEffect } from "react";
import Cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginStatus } from "../store/loginStore.js";
import { useNavigate } from "react-router-dom";
import { pathRoutes } from "../../routes/web.js";

const AuthMidContext = createContext();

const AuthProvider = ({ children }) => {
    const isAuthenticated = useSelector(state => state.loginState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        const hasAccess = Cookie.get("admin");

        if (hasAccess) {
            dispatch(changeLoginStatus(true))
        }
    }, []);

    useEffect(() => {
        if(!isAuthenticated){
            navigate(pathRoutes.login)
        }
    }, [isAuthenticated])
    
    const loginUser = (token) => {
        Cookie.set("admin", token, { expires: 14, secure: true, sameSite: 'strict' });
        dispatch(changeLoginStatus(false))
    };
    
    const logoutUser = () => {
        Cookie.remove("admin");
        dispatch(changeLoginStatus(false))
    };

    return (
        <AuthMidContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
            {children}
        </AuthMidContext.Provider>
    );
};

export { AuthMidContext, AuthProvider };