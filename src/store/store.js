import { combineReducers, compose, legacy_createStore as createStore } from "redux"


import { userReducer } from "./reducers/userReducer"
import { boardReducer } from "./reducers/boardReducer"

const rootReducer = combineReducers({
    boardModule: boardReducer,
    userModule: userReducer,
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store