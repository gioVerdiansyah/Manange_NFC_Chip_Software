const ADD_UNIT = "ADD_UNIT"
const FIELDS_ERROR = "FIELDS_ERROR"
const UNIT_DATA = "UNIT_DATA"

export function setUnitFields(data) {
    return {
        type: ADD_UNIT,
        data
    }
}

export function setFieldsUnitError(data) {
    return {
        type: FIELDS_ERROR,
        data
    }
}

export function setUnitData(data) {
    return {
        type: UNIT_DATA,
        data
    }
}

const initialState = {
    fields: { scene_id: "", unit_id: "" },
    errors: { unit_id: "" },
    unit_data: {}
}

function manageUnitStore(state = initialState, action) {
    switch (action.type) {
        case ADD_UNIT:
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
        case UNIT_DATA:
            return {
                ...state,
                unit_data: action.data
            }
        default:
            return state
    }
}

export default manageUnitStore