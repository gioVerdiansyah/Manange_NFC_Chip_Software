import { combineReducers } from "redux";
import loginStore from "./loginStore.js";
import themeStore from "./themeStore.js";
import manageMachineStore from "./manageMachineStore.js";
import trueOrFalseStore from "./trueOrFalseStore.js";
import dashboardDataStore from "./dashboardDataStore.js";
import manageUnitStore from "./manageUnitStore.js";
import searchStore from "./searchStore.js";

const storeStates = combineReducers({
    loginState: loginStore,
    themeState: themeStore,
    trueOrFalseState: trueOrFalseStore,
    manageMachineState: manageMachineStore,
    dashboardState: dashboardDataStore,
    manageUnitState: manageUnitStore,
    searchFieldState: searchStore
})

export default storeStates