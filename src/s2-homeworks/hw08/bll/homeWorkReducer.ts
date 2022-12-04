import {UserType} from '../HW8'

const SORT_USERS = 'SORT_USERS'
const CHECK_USERS = 'CHECK_USERS'

type SortNameAT = {
    type: typeof SORT_USERS
    name: string
}
type CheckUsersType = {
    type: typeof CHECK_USERS
    age: number
}
type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
    switch (action.type) {
        case 'sort': { // by name
            const stateCopy = state.map(u => ({...u}))
            if (action.payload === 'up') {
                stateCopy.sort(function (a, b) {
                    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                    if (nameA < nameB)
                        return -1
                    return 0
                })
            }
            if (action.payload === 'down') {
                stateCopy.sort(function (a, b) {
                    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
                    if (nameA > nameB)
                        return -1
                    return 0
                })
            }
            return stateCopy // need to fix
        }
        case 'check': {
            const stateCopy = state.map(u => ({...u}))
            if (action.payload >= 18) {
                return stateCopy.filter(u => u.age >= action.payload)
            }
            return stateCopy // need to fix
        }
        default:
            return state
    }
}

export const SortNameAC = (name: string): SortNameAT => ({type: SORT_USERS, name})
export const CheckUsersAC = (age: number): CheckUsersType => ({type: CHECK_USERS, age})