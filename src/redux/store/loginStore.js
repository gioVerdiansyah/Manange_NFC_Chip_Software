const CHANGE_LOGIN_STATUS = 'CHANGE_LOGIN_STATUS'
const SET_STATE_LOGIN_FIELDS = "SET_STATE_LOGIN_FIELDS"
const ERROR_FIELDS = "ERROR_FIELDS"

export function changeLoginStatus(status){
    return{
        type: CHANGE_LOGIN_STATUS,
        status
    }
}

export function setLoginDataInput(data){
    return {
        type: SET_STATE_LOGIN_FIELDS,
        data
    }
}
export function setLoginErrorFields(data){
    return {
        type: ERROR_FIELDS,
        data
    }
}

let loginStatusState = false
const dataFields = {
    email: "",
    password: ""
}
const errorFields = {
    email: "",
    password: ""
}

const initialState = {
    isLoggedIn: loginStatusState,
    fields: dataFields,
    errorFields: errorFields
};

function loginStore(state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOGIN_STATUS:
            return {
                ...state,
                isLoggedIn: state.isLoggedIn,
            };
        case SET_STATE_LOGIN_FIELDS:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    ...action.data,
                },
            };
        case ERROR_FIELDS:
            return {
                ...state,
                errorFields: {
                    ...state.errorFields,
                    ...action.data,
                },
            };
        default:
            return state;
    }
}

export default loginStore