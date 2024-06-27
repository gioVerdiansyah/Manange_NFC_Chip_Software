import { combineReducers } from "redux";
import loginStore from "./loginStore.js";
import themeStore from "./themeStore.js";

const storeStates = combineReducers({
    loginState: loginStore,
    themeState: themeStore
})

export default storeStates