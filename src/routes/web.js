import App from "../App.js"
import Activity from "../views/Activity.jsx"
import { DashboardView } from "../views/Dashboard.jsx"
import { LoginView } from "../views/Login.jsx"
import Machine from "../views/Machine.jsx"

const pathRoutes = {
    home: "/",
    login: "/login",
    dashboard: "/dashboard",
    machine: "/machine",
    logActivity: "/log-activity",
}

const routes = [
    {path: pathRoutes.home, content: <App/>},
    {path: pathRoutes.login, content: <LoginView/>},
    {path: pathRoutes.dashboard, content: <DashboardView/>},
    {path: pathRoutes.machine, content: <Machine/>},
    {path: pathRoutes.logActivity, content: <Activity/>}
]

export {pathRoutes, routes}