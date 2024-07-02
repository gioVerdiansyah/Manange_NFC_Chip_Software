import { combineReducers } from "redux";
import loginStore from "./loginStore.js";
import themeStore from "./themeStore.js";
import isLoadingStore from "./loadingStore.js";

const storeStates = combineReducers({
    loginState: loginStore,
    themeState: themeStore,
    isLoadingState: isLoadingStore
})

export default storeStates