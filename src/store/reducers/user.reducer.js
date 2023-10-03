// import { userService } from "../../services/user.service.js";

export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'

const initialState = {
    count: 101,
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {

        case 'INCREMENT':
            return { ...state, count: state.count + 1 }
        case 'DECREMENT':
            return { ...state, count: state.count - 1 }
        case 'CHANGE_BY':
            return { ...state, count: state.count + action.diff }


        // User
        case SET_USER:
            return { ...state, loggedinUser: action.user }
        case SET_USERS:
            newState = { ...state, users: action.users }
            break
        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.user }
            break

        default:
            return state;
    }
}