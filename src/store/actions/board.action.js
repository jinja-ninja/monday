import { boardService } from '../../services/board.service.local'
import { utilService } from '../../services/util.service'
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

export async function addBoard() {
    // const owner = loggedInUser
    //CHANGE LATER TO A STARTER BOARD - MAKE DEMO DATA FOR IT!
    const board = {
        title: 'New Board',
        isStarred: false,
        description: '',
        archivedAt: null,
        createdBy: { _id: '', fullname: '', imgUrl: '' },
        members: [],
        groups: [],
        cmpsOrder: [
            { id: utilService.makeId(), cmpName: 'ownerPicker', defaultWidth: '85px', minWidth: '85px', isShown: true },
            {
                id: utilService.makeId(),
                cmpName: 'statusPicker',
                defaultWidth: '150px',
                minWidth: '50px',
                isShown: true,
            },
            {
                id: utilService.makeId(),
                cmpName: 'priorityPicker',
                defaultWidth: '150px',
                minWidth: '50px',
                isShown: true,
            },
            {
                id: utilService.makeId(),
                cmpName: 'timelinePicker',
                defaultWidth: '150px',
                minWidth: '70px',
                isShown: true,
            },
            {
                id: utilService.makeId(),
                cmpName: 'collaboratorPicker',
                defaultWidth: '150px',
                minWidth: '100px',
                isShown: true,
            },
            { id: utilService.makeId(), cmpName: 'datePicker', defaultWidth: '100px', minWidth: '50px', isShown: true },
        ],
        statusLabels: [
            { id: 'sl100', title: 'Done', color: '#00C875' },
            { id: 'sl101', title: 'Working on it', color: '#FDAB3D' },
            { id: 'sl102', title: 'Stuck', color: '#E2445C' },
            { id: 'sl103', title: 'Almost done', color: '#0086C0' },
            { id: 'sl104', title: '', color: '#C4C4C4' },
        ],
        priorityLabels: [
            { id: 'pl100', title: 'Critical', color: '#333333' },
            { id: 'pl101', title: 'High', color: '#401694' },
            { id: 'pl102', title: 'Medium', color: '#5559DF' },
            { id: 'pl103', title: 'Low', color: '#579BFC' },
            { id: 'pl104', title: '', color: '#C4C4C4' },
        ],
        activities: [],
    }

    try {
        const newBoard = await boardService.save(board)
        store.dispatch({ type: ADD_BOARD, board: newBoard })
    } catch (err) {
        throw err
    }
}

export async function updateBoard(board) {
    try {
        const newBoard = await boardService.save(board)
        store.dispatch({ type: UPDATE_BOARD, board: newBoard })
    } catch (err) {
        throw err
    }
}
