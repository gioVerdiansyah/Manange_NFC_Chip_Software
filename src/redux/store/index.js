import { combineReducers } from "redux";
import loginStore from "./loginStore.js";
import themeStore from "./themeStore.js";
import manageMachineStore from "./manageMachineStore.js";
import trueOrFalseStore from "./trueOrFalseStore.js";

const storeStates = combineReducers({
    loginState: loginStore,
    themeState: themeStore,
    trueOrFalseState: trueOrFalseStore,
    manageMachineState: manageMachineStore
})

export default storeStates