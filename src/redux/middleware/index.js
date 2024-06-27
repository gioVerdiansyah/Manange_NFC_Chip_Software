import { useContext } from "react";
import { AuthMidContext } from "./AuthMidContext.js";

const useAuth = () => {
    const auth = useContext(AuthMidContext)
    return auth
}

export default useAuth