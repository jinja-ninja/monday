import { boardService } from '../../services/board.service.local'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARDS, SET_BOARD } from '../reducers/board.reducer'
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
        const board = await boardService.getBoardById(boardId)
        store.dispatch({ type: SET_BOARD, board })
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
        console.log('newBorad:', newBoard)
        store.dispatch({ type: SET_BOARD, board: newBoard })
        store.dispatch({ type: UPDATE_BOARDS, board: newBoard })
    } catch (err) {
        throw err
    }
}

export async function addGroup(board, group) {
    try {
        const newBoard = await boardService.addGroup(board, group)
        store.dispatch({ type: UPDATE_BOARD, board: newBoard })
    } catch (err) {
        throw err
    }
}