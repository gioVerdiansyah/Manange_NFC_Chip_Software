const DASHBOARD_STORE = "DASHBOARD_STORE"

export function setDashboardData(data) {
    return {
        type: DASHBOARD_STORE,
        data
    }
}

const initialState = {
    total_machine: 0,
    total_machine_used: 0,
    latest_machine_used: {
        name: "-",
        date: "-"
    },
    latest_machine_buy: {
        name: "-",
        date: "-"
    }
}

function dashboardDataStore(state = initialState, action){
    switch(action.type){
        case DASHBOARD_STORE:
            return {
                ...state,
                total_machine: action.data.total_machine,
                total_machine_used: action.data.total_machine_used,
                latest_machine_used: {
                    name: action.data.latest_machine_used.name,
                    date: action.data.latest_machine_used.date
                },
                latest_machine_buy: {
                    name: action.data.latest_machine_buy.name,
                    date: action.data.latest_machine_buy.date
                }
            }
        default:
            return state
    }
}

export default dashboardDataStore