export type ActionType = {
    type: 'SET_THEME_ID'
    id: number
}
export type InitStateType = {
    themeId: number
}
const initState = {
    themeId: 1,
}

export const themeReducer = (state: InitStateType = initState, action: ActionType): InitStateType => { // fix any
    switch (action.type) {
        case "SET_THEME_ID": {
            return {...state, themeId: action.id}
        }

        default:
            return state
    }
}

export const changeThemeId = (id: number): ActionType => ({type: 'SET_THEME_ID', id}) // fix any
