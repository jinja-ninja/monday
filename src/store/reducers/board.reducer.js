export const SET_BOARDS = 'SET_BOARDS'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'


const initialState = {
    boards: [],
}

export function boardReducer(state = initialState, action) {
    let newBoards
    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards }
        case REMOVE_BOARD:
            newBoards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards: newBoards }
        case ADD_BOARD:
            newBoards = [...state.boards, action.board]
            return { ...state, boards: newBoards }
        case UPDATE_BOARD:
            newBoards = state.boards.map(board => (board._id === action.board._id ? action.board : board))
            return { ...state, boards: newBoards }
        case ADD_TASK: {
            const { board, groupIdx, task } = action
            const newBoard = { ...board }
            newBoard.groups[groupIdx].tasks.push(task)
            newBoards = state.boards.map(currBoard => (currBoard._id === newBoard._id ? newBoard : currBoard))
            return { ...state, boards: newBoards }
        }
        case REMOVE_TASK: {
            const { board, groupIdx, taskIdx } = action
            const newBoard = { ...board }
            newBoard.groups[groupIdx].tasks.splice(taskIdx, 1)
            newBoards = state.boards.map(currBoard => (currBoard._id === newBoard._id ? newBoard : currBoard))
            return { ...state, boards: newBoards }
        }
        case UPDATE_TASK: {
            const { board, groupIdx, taskIdx, task } = action
            const newBoard = { ...board }
            newBoard.groups[groupIdx].tasks[taskIdx] = task
            newBoards = state.boards.map(currBoard => (currBoard._id === newBoard._id ? newBoard : currBoard))
            return { ...state, boards: newBoards }
        }


        default:
            return { ...state }


    }
}
