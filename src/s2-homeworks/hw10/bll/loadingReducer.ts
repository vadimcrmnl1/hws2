type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}
export type InitStateType = {
    isLoading: boolean
}
const initState: InitStateType = {
    isLoading: false,
}

export const loadingReducer = (state = initState, action: LoadingActionType): InitStateType => { // fix any

    switch (action.type) {
        case "CHANGE_LOADING":

            return {isLoading: action.isLoading}
        // пишет студент  // need to fix

        default:
            return state
    }
}



export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading,
})
