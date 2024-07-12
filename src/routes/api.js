const url = process.env.REACT_APP_API_URL

export const apiRoutes = {
    login: url + "admin/login",
    logout: url + "admin/logout",
    scene: url + "admin/scene",
    units: url + "admin/units",
    sceneSearch: url + "admin/scene/search/",
    unitSearch: url + "admin/units/search/",
    dashboardData: url + "admin/dashboard"
}