const THEME_STATUS = "THEME_STATUS"

export function changeTheme(status){
    return{
        type: THEME_STATUS,
        status
    }
}

let defaultTheme = 'emerald'

function themeStore(state = defaultTheme, action){
    switch(action.type){
        case THEME_STATUS:
            const nweTheme = state === 'forest' ? 'emerald' : 'forest'
            document.querySelector('html').setAttribute('data-theme', nweTheme)
            return nweTheme;
        default:
            return state
    }
}

export default themeStore