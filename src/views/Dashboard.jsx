import { Link } from "react-router-dom";
import { pathRoutes } from "../routes/web";
import { AuthMidContext } from "../redux/middleware/AuthMidContext";
import { useContext } from "react";

export function DashboardView() {
    const { isAuthenticated } = useContext(AuthMidContext);
    console.log(isAuthenticated);
    return (
        <Link to={pathRoutes.login}>Ke login</Link>
    );
}
