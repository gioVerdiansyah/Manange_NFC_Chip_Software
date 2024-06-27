import App from "../App.js"
import { DashboardView } from "../views/Dashboard.jsx"
import { LoginView } from "../views/Login.jsx"

const pathRoutes = {
    home: "/",
    login: "/login",
    dashboard: "/dashboard"
}

const routes = [
    {path: pathRoutes.home, content: <App/>},
    {path: pathRoutes.login, content: <LoginView/>},
    { path: pathRoutes.dashboard, content: <DashboardView/>}
]

export {pathRoutes, routes}