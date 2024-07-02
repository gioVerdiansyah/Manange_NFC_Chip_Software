const IS_LOADING = "IS_LOADING"

export function setLoading(bool){
    return {
        type: IS_LOADING,
        bool
    }
}

const initialState = {
    isLoading: false
}

function isLoadingStore(state = initialState, action){
    switch(action.type){
        case IS_LOADING:
            return {
                isLoading: !state.isLoading
            }
        default:
            return state
    }
}

export default isLoadingStore