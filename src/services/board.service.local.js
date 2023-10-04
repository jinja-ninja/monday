import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'



const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getBoardById,
    save,
    remove,
    getEmptyBoard
}

async function query() {
    return await storageService.query(STORAGE_KEY)
}

async function getBoardById(boardId) {
    return await storageService.get(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function remove(boardId) {
    return await storageService.remove(STORAGE_KEY, boardId)
}

function getEmptyBoard() {
    return {
        title: '',
        createdAt: Date.now(),
        createdBy: {
            _id: 'u101'
        }
    }
}
