
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
}

window.us = userService

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ email, password }) {
    const user = storageService.query(STORAGE_KEY, { email, password })
    console.log('user:', user)
    _setLoggedinUser(user)
    return user
    // return httpService.post(BASE_URL + 'login', { email, password })
    //     .then(user => {
    //         if (user) return _setLoggedinUser(user)
    //     })
}

function signup({ email, password, fullname }) {
    const user = { email, password, fullname }
    return storageService.post(STORAGE_KEY, user)
    // return httpService.post(BASE_URL + 'signup', user)
    //     .then(user => {
    //         if (user) return _setLoggedinUser(user)
    //     })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
    // return httpService.post(BASE_URL + 'logout')
    //     .then(() => {
    //         sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    //     })
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

// Test Data
// userService.signup({ email: 'nati@funday.com', password: 'nati', fullname: 'Nati Feldbaum' })
// userService.signup({ email: 'gal@funday.com', password: 'gal', fullname: 'Gal Ben Natan' })
// userService.signup({ email: 'omer@funday.com', password: 'omer', fullname: 'Omer Vered' })
// userService.login({email: 'muki', password: 'muki1'})



