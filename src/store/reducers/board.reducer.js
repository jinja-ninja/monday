export const SET_BOARDS = 'SET_BOARDS'
export const UPDATE_BOARDS = 'UPDATE_BOARDS'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const ADD_TASK = 'ADD_TASK'
export const REMOVE_TASK = 'REMOVE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const SET_BOARD = 'SET_BOARD'

export const SET_SELECTED_TASKS = 'SET_SELECTED_TASKS'
export const ADD_SELECTED_TASKS = 'ADD_SELECTED_TASKS'
export const ADD_SELECTED_TASK = 'ADD_SELECTED_TASK'
export const REMOVE_SELECTED_TASK = 'REMOVE_SELECTED_TASK'
export const REMOVE_SELECTED_TASKS = 'REMOVE_SELECTED_TASKS'

export const SET_COLUMNS_STATE = 'SET_COLUMNS_STATE'
export const UPDATE_COLUMNS_STATE = 'UPDATE_COLUMNS_STATE'

const initialState = {
    boards: [],
    board: null,
    selectedTasks: [],
    columnsState: [
        { name: "Members", isChecked: true },
        { name: "Status", isChecked: true },
        { name: "Priority", isChecked: true },
        { name: "DueDate", isChecked: true },
        { name: "Timeline", isChecked: true },
        { name: "Files", isChecked: true }
    ]

}

export function boardReducer(state = initialState, action) {
    let newBoards
    let newSelectedTasks
    let newColumnsState
    switch (action.type) {
        case SET_BOARD:
            return { ...state, board: action.board }

        case REMOVE_BOARD:
            newBoards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards: newBoards }

        case ADD_BOARD:
            newBoards = [...state.boards, action.board]
            return { ...state, boards: newBoards }

        case SET_BOARDS:
            return { ...state, boards: action.boards }

        case UPDATE_BOARDS:
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

        case SET_SELECTED_TASKS: {
            return { ...state, selectedTasks: action.selectedTasks }
        }

        case ADD_SELECTED_TASKS: {
            newSelectedTasks = [...state.selectedTasks, ...action.selectedTasks]
            return { ...state, selectedTasks: newSelectedTasks }
        }

        case ADD_SELECTED_TASK: {
            newSelectedTasks = [...state.selectedTasks, action.selectedTask]
            return { ...state, selectedTasks: newSelectedTasks }
        }

        case REMOVE_SELECTED_TASK: {
            const { taskId, groupId } = action.selectedTask
            newSelectedTasks = state.selectedTasks.filter(task =>
                !(task.taskId === taskId && task.groupId === groupId))
            return { ...state, selectedTasks: newSelectedTasks }
        }

        case REMOVE_SELECTED_TASKS: {
            newSelectedTasks = state.selectedTasks.filter(task => {
                return !action.selectedTasks.some(selectedTask =>
                    selectedTask.groupId === task.groupId && selectedTask.taskId === task.taskId
                )
            })
            return { ...state, selectedTasks: newSelectedTasks }
        }

        case REMOVE_SELECTED_TASKS: {
            newSelectedTasks = state.selectedTasks.filter(taskId => !action.selectedTasks.includes(taskId))
            return { ...state, selectedTasks: newSelectedTasks }
        }

        case SET_COLUMNS_STATE: {
            return { ...state, columnsState: action.columnsState }
        }

        case UPDATE_COLUMNS_STATE: {
            newColumnsState = state.columnsState.map(col => (col.name === action.updatedColumn.name ? action.updatedColumn : col))
            return { ...state, columnsState: newColumnsState }
        }

        default:
            return { ...state }

    }
}
