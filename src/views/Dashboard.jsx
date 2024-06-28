import { Link } from "react-router-dom";
import { pathRoutes } from "../routes/web";
import { AuthMidContext } from "../redux/middleware/AuthMidContext";
import { useContext } from "react";
import RootLayout from "./components/layouts/RootLayout";

export function DashboardView() {
    const { isAuthenticated } = useContext(AuthMidContext);
    console.log(isAuthenticated);
    return (
        <RootLayout>
            <Link to={pathRoutes.login}>Ke login</Link>
        </RootLayout>
    );
}
