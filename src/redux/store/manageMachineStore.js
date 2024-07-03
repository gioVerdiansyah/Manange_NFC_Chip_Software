const ADD_MACHINE = "ADD_MACHINE"
const FIELDS_ERROR = "FIELDS_ERROR"
const MACHINE_DATA = "MACHINE_DATA"

export function setMachineFields(data) {
    return {
        type: ADD_MACHINE,
        data
    }
}

export function setFieldsMachineError(data) {
    return {
        type: FIELDS_ERROR,
        data
    }
}

export function setMachineData(data) {
    return {
        type: MACHINE_DATA,
        data
    }
}

const fields = {
    nfc_id: "",
    machine_name: ""
}

const initialState = {
    fields: { id: "", ...fields },
    errors: fields,
    machine_data: {}
}

function manageMachineStore(state = initialState, action) {
    switch (action.type) {
        case ADD_MACHINE:
            return {
                ...state,
                fields: {
                    ...state.fields,
                    ...action.data
                }
            }
        case FIELDS_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    ...action.data
                }
            }
        case MACHINE_DATA:
            return {
                ...state,
                machine_data: {
                    ...state.machine_data,
                    ...action.data
                }
            }
        default:
            return state
    }
}

export default manageMachineStore