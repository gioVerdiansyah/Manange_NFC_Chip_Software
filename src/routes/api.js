const url = process.env.REACT_APP_API_URL

export const apiRoutes = {
    login: url + "admin/login",
    logout: url + "admin/logout",
}