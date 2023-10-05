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
    const board = {
        title: "New Board",
        isStarred: false,
        archivedAt: 1589983468418,
        createdBy: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img"
        },
        style: {
            backgroundImage: ""
        },
        labels: [
            {
                id: "l101",
                title: "Done",
                color: "#61bd4f"
            },
            {
                id: "l102",
                title: "Progress",
                color: "#61bd33"
            }
        ],
        members: [
            {
                _id: "u101",
                fullname: "Tal Tarablus",
                imgUrl: "https://www.google.com"
            }
        ],
        groups: [
            {
                id: "g101",
                title: "Group 1",
                archivedAt: 1589983468418,
                tasks: [
                    {
                        id: "c101",
                        title: "Replace logo"
                    },
                    {
                        id: "c102",
                        title: "Add Samples"
                    }
                ],
                style: {}
            },
            {
                id: "g102",
                title: "Group 2",
                tasks: [
                    {
                        id: "c103",
                        title: "Do that",
                        archivedAt: 1589983468418
                    },
                    {
                        id: "c104",
                        title: "Help me",
                        status: "in-progress",
                        priority: "high",
                        description: "description",
                        comments: [
                            {
                                id: "ZdPnm",
                                txt: "also @yaronb please CR this",
                                createdAt: 1590999817436,
                                byMember: {
                                    _id: "u101",
                                    fullname: "Tal Tarablus",
                                    imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            }
                        ],
                        checklists: [
                            {
                                id: "YEhmF",
                                title: "Checklist",
                                todos: [
                                    {
                                        id: "212jX",
                                        title: "To Do 1",
                                        isDone: false
                                    }
                                ]
                            }
                        ],
                        memberIds: ["u101"],
                        labelIds: ["l101", "l102"],
                        dueDate: 16156215211,
                        byMember: {
                            _id: "u101",
                            username: "Tal",
                            fullname: "Tal Tarablus",
                            imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        style: {
                            backgroundColor: "#26de81"
                        }
                    }
                ],
                style: {}
            }
        ],
        activities: [
            {
                id: "a101",
                txt: "Changed Color",
                createdAt: 154514,
                byMember: {
                    _id: "u101",
                    fullname: "Abi Abambi",
                    imgUrl: "http://some-img"
                },
                group: {
                    id: "g101",
                    title: "Urgent Stuff"
                },
                task: {
                    id: "c101",
                    title: "Replace Logo"
                }
            }
        ],
        cmpsOrder: ["StatusPicker", "MemberPicker", "DatePicker"]
    }

    try {
        const newBoard = await boardService.save(board)
        store.dispatch({ type: ADD_BOARD, board: newBoard })
    } catch (err) {
        console.log('Board Actions: err in Adding Board', err)
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
        console.log('board from add group function:', board)
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

