const SEARCH_FIELD = "SEARCH_FIELD"

export function setSearchField(input) {
    return {
        type: SEARCH_FIELD,
        payload: input
    }
}


const initialState = {
    fields: ""
}

function searchStore(state = initialState, action) {
    switch (action.type) {
        case SEARCH_FIELD:
            return {
                fields: action.payload
            }
        default:
            return state;
    }
}

export default searchStore;