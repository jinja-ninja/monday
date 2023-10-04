import { boardService } from '../../services/board.service.local'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARD, SET_BOARD } from '../reducers/board.reducer'
import { store } from '../store'

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        throw err
    }
}

export async function getBoardById(boardId) {
    try {
        // console.log('boardId:', boardId)
        const board = await boardService.getBoardById(boardId)
        // console.log('board:', board)
        return board
        // store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
    } catch (err) {
        throw err
    }
}

export async function addBoard(board) {
    try {
        const newBoard = await boardService.save(board)
        store.dispatch({ type: ADD_BOARD, board: newBoard })
    } catch (err) {
        throw err
    }
}

export async function updateBoard(type, boardId, groupId = null, taskId = null, { key, value }) {
    try {
        const newBoard = await boardService.update(type, boardId, groupId = null, taskId = null, { key, value })
        store.dispatch({ type: UPDATE_BOARD, board: newBoard })
    } catch (err) {
        throw err
    }
}
