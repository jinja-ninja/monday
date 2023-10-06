import { store } from '../store'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UPDATE_BOARDS, SET_BOARD } from '../reducers/board.reducer'
import { boardService } from '../../services/board.service.local'


//General Board Actions
export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('Board Actions: err in Loading Boards', err)
        throw err
    }
}

//Specific Board Actions
// !!!!! TO DO !!!!!!
// change name to updateCurrentBoard
export async function getBoardById(boardId) {
    try {
        const board = await boardService.getBoardById(boardId)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.log('Board Actions: err in Getting Board', err)
        throw err
    }
}

export async function addBoard() {
    // const owner = loggedInUser
    //CHANGE LATER TO A STARTER BOARD - MAKE DEMO DATA FOR IT!
    const board = boardService.getNewBoard()

    try {
        const newBoard = await boardService.save(board)
        store.dispatch({ type: ADD_BOARD, board: newBoard })
    } catch (err) {
        console.log('Board Actions: err in Adding Board', err)
        throw err
    }
}
export async function toggleBoardFavorite(boardId) {
    try {
        let board = await boardService.getBoardById(boardId)
        let starredState = board.isStarred = !board.isStarred
        store.dispatch({ type: UPDATE_BOARDS, board: board })
        return await boardService.update('board', boardId, null, null, { key: 'isStarred', value: starredState })
    } catch (error) {
        console.log('Board Actions: err in Adding Board', err)
        throw err
    }
}

export async function duplicateBoard(boardId) {
    try {
        const board = await boardService.getBoardById(boardId)
        let duplicatedBoard = await boardService.duplicateBoard(board)
        store.dispatch({ type: ADD_BOARD, board: duplicatedBoard })

        return duplicatedBoard
    } catch (err) {
        console.log('Board Actions: err in Board Duplicate', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
    } catch (err) {
        console.log('Board Actions: err in Removing Board', err)
        throw err
    }
}

export async function updateBoard(type, boardId, groupId = null, taskId = null, { key, value }) {

    try {
        const currBoard = store.getState().boardModule.board
        const newBoard = await boardService.update(type, boardId, groupId, taskId, { key, value })
        if (boardId === currBoard._id) {
            store.dispatch({ type: SET_BOARD, board: newBoard })
        }
        store.dispatch({ type: UPDATE_BOARDS, board: newBoard })
    } catch (err) {
        console.log('Updating actions: err in updating', err)
        throw err
    }
}

// Group Actions
export async function addGroup(boardId) {
    try {
        let board = await boardService.getBoardById(boardId)
        board = await boardService.addNewGroup(board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
    } catch (err) {
        console.log('Group Actions: err in Adding Group', err)
        throw err
    }
}

export async function removeGroup(boardId, groupId) {
    try {
        let board = await boardService.getBoardById(boardId)
        board = await boardService.removeGroup(board, groupId)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
    } catch (err) {
        console.log('Group Actions: err in Removing Group', err)
        throw err
    }
}

export async function duplicatedGroup(boardId, groupId) {
    try {
        let board = await boardService.getBoardById(boardId)
        board = await boardService.duplicatedGroup(board, groupId)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
    } catch (err) {
        console.log('Group Actions: err in Duplicate Group', err)
        throw err
    }
}

// Task Actions
export async function addTask(boardId, groupId, task) {
    try {
        const board = await boardService.addTask(boardId, groupId, task)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
    } catch (err) {
        console.log('BoardActions: err in addTask', err)
        throw err
    }
}

export async function removeTask(boardId, groupId, taskId) {
    try {
        console.log('taskId from remove task:', taskId)
        const board = await boardService.removeTask(boardId, groupId, taskId)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
    } catch (err) {
        console.log('BoardActions: err in removeTask', err)
        throw err
    }
}

export async function updateTask(boardId, groupId, taskId, data) {
    try {
        const board = await boardService.update('task', boardId, groupId, taskId, data)
        console.log('board:', board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
    } catch (err) {
        console.log('BoardActions: err in updateTask', err)
        throw err
    }
}

export async function duplicatedTask(boardId, groupId, taskId) {
    try {
        let board = await boardService.getBoardById(boardId)
        board = await boardService.duplicatedTask(board, groupId, taskId)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: UPDATE_BOARDS, board })
    } catch (err) {
        console.log('BoardActions: err in duplicateTask', err)
        throw err
    }
}

