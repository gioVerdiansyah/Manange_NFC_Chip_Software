import App from "../App.js"
import { DashboardView } from "../views/Dashboard.jsx"
import { LoginView } from "../views/Login.jsx"
import MachineScene from "../views/MachineScene.jsx"
import UnitsPurchased from "../views/UnitsPurchased.jsx"

const pathRoutes = {
    home: "/",
    login: "/login",
    dashboard: "/dashboard",
    machineScene: "/machine-scene",
    unitsPurchased: "/machine-scene/purchased",
}

const routes = [
    {path: pathRoutes.home, content: <App/>},
    {path: pathRoutes.login, content: <LoginView/>},
    {path: pathRoutes.dashboard, content: <DashboardView/>},
    { path: pathRoutes.machineScene, content: <MachineScene/>},
    { path: pathRoutes.unitsPurchased, content: <UnitsPurchased/>},
]

export {pathRoutes, routes}