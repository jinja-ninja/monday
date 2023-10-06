import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getBoardById,
    update,
    save,
    remove,
    // getEmptyBoard,
    getNewBoard,
    getEmptyTask,
    removeTask,
    addTask,
    addNewGroup,
    removeGroup,
    getEmptyGroup,
    duplicatedGroup,
    getEmptyTask,
    createActivity,
    _createBoards,
    duplicatedTask,
    duplicateBoard,
}

_createBoards()

// General Update function
async function update(type, boardId, groupId = null, taskId = null, { key, value }) {
    try {

        const board = await getBoardById(boardId)
        let groupIdx, taskIdx, activity

        switch (type) {
            case 'board':
                if (!boardId) throw new Error('Error updating')
                board[key] = value
                break

            case 'group':
                if (!groupId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                board.groups[groupIdx][key] = value

                activity = createActivity(`Updated group ${board.groups[groupIdx].title}`, board._id, groupId)
                board.activities.unshift(activity)

                break

            case 'task':
                if (!taskId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
                board.groups[groupIdx].tasks[taskIdx][key] = value

                activity = createActivity(`Updated task ${board.groups[groupIdx].tasks[taskIdx].title}`, boardId, groupId, taskId)
                board.activities.unshift(activity)
                break

            default:
                break
        }

        return await storageService.put(STORAGE_KEY, board)
    }
    catch {
        // console.log('error')
        throw new Error('Error updating')
    }

}
// Board functions
async function query() {
    return await storageService.query(STORAGE_KEY)
}

async function getBoardById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    return board
}

async function save(board) {
    return await storageService.post(STORAGE_KEY, board)
}

async function remove(boardId) {
    return await storageService.remove(STORAGE_KEY, boardId)
}

function getNewBoard() {
    return {
        title: "New Board",
        isStarred: false,
        archivedAt: '',
        createdAt: Date.now(),
        createdBy: {
            _id: utilService.makeId(),
            fullname: "Gal Ben Natan",
            imgUrl: "http://some-img"
        },
        style: {
            backgroundImage: ""
        },
        labels: [
            {
                id: utilService.makeId(),
                title: "Done",
                color: "#61bd4f"
            },
            {
                id: utilService.makeId(),
                title: "Progress",
                color: "#61bd33"
            }
        ],
        members: [
            {
                _id: utilService.makeId(),
                fullname: "Nati Feldman",
                imgUrl: "https://www.google.com"
            }
        ],
        groups: [
            {
                id: utilService.makeId(),
                title: "Group 1",
                archivedAt: '',
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Type your task here"
                    },
                    {
                        id: utilService.makeId(),
                        title: "Type your task here"
                    }
                ],
                style: {}
            },
            {
                id: utilService.makeId(),
                title: "Group 2",
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        archivedAt: ''
                    },
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        status: "Not started",
                        priority: "unset",
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
                        memberIds: [""],
                        labelIds: ["l101", "l102"],
                        dueDate: "No deadline",
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
}

//MAKE AN EMPTY BOARD FUNCTION - TEST DEMO DATA LATER
// function getEmptyBoard() {
//     return {
//         title: '',
//         createdAt: Date.now(),
//         createdBy: {
//             _id: 'u101'
//         }
//     }
// }

async function duplicateBoard(board) {
    const duplicatedBoard = JSON.parse(JSON.stringify(board))
    duplicatedBoard._id = utilService.makeId()
    duplicatedBoard.title = duplicatedBoard.title + ' copy'
    return await save(duplicatedBoard)
}

function getEmptyTask(title = '') {
    return {
        id: makeTaskId(),
        title,
        status: ``,
        priority: ``,
        description: ``,
        comments: [],
        checklists: [],
        memberIds: [],
        labelIds: [],
        dueDate: null,
        byMember: {
            _id: ``,
            username: ``,
            fullname: ``,
            imgUrl: ``
        },
        style: {
            backgroundColor: "var(--primary-background-color)"
        }
    }
}

function createActivity(txt, boardId, groupId = null, taskId = null) {
    return {
        id: 'a-' + utilService.makeId(),
        createdAt: Date.now(),
        byMember: '',
        boardId,
        groupId,
        taskId,
        action: txt,
    }
}

//Task functions

async function removeTask(boardId, groupId, taskId) {
    const board = await getBoardById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    const task = board.groups[groupIdx].tasks[taskIdx]
    board.groups[groupIdx].tasks.splice(taskIdx, 1)

    const activity = createActivity(`Removed task ${task.title}`, boardId, groupId, taskId)
    board.activities.unshift(activity)

    return await storageService.put(STORAGE_KEY, board)
}
async function addTask(boardId, groupId, task) {

    const board = await getBoardById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    board.groups[groupIdx].tasks.push(task)

    const activity = createActivity(`Added task ${task.title}`, boardId, groupId, task.id)
    board.activities.unshift(activity)

    return await storageService.put(STORAGE_KEY, board)
}

async function duplicatedTask(board, groupId, taskId) {
    const updatedBoard = { ...board }
    const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
    const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    const taskToDuplicate = updatedBoard.groups[groupIdx].tasks[taskIdx]
    const duplicatedTask = JSON.parse(JSON.stringify(taskToDuplicate))
    duplicatedTask.id = utilService.makeId()
    duplicatedTask.title = duplicatedTask.title + ' copy'
    updatedBoard.groups[groupIdx].tasks.splice(taskIdx + 1, 0, duplicatedTask)
    return await storageService.put(STORAGE_KEY, updatedBoard)
}

//Group functions

function getEmptyGroup() {
    return {
        id: utilService.makeGroupId(),
        title: 'New Group',
        tasks: [],
        style: {},
        archivedAt: null,
    }
}
async function addNewGroup(board) {

    const newGroup = getEmptyGroup()
    const updatedBoard = { ...board }
    updatedBoard.groups.push(newGroup)

    const activity = createActivity(`Created group ${newGroup.title}`, board._id, newGroup.id)
    updatedBoard.activities.unshift(activity)

    return await storageService.put(STORAGE_KEY, updatedBoard)
}

async function removeGroup(board, groupId) {
    const updatedBoard = { ...board }
    const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
    const group = updatedBoard.groups[groupIdx]
    updatedBoard.groups.splice(groupIdx, 1)

    const activity = createActivity(`Removed group ${group.title}`, board._id, groupId)
    updatedBoard.activities.unshift(activity)

    return await storageService.put(STORAGE_KEY, updatedBoard)
}

async function duplicatedGroup(board, groupId) {
    const updatedBoard = { ...board }
    const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
    const groupToDuplicate = updatedBoard.groups[groupIdx]
    const duplicatedGroup = JSON.parse(JSON.stringify(groupToDuplicate))
    duplicatedGroup.id = utilService.makeId()
    duplicatedGroup.title = duplicatedGroup.title + ' copy'
    updatedBoard.groups.splice(groupIdx + 1, 0, duplicatedGroup)

    const activity = createActivity(`Duplicated group ${groupToDuplicate.title}`, board._id, groupId)
    updatedBoard.activities.unshift(activity)

    return await storageService.put(STORAGE_KEY, updatedBoard)
}


function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards || !boards.length) {
        boards =
            [
                {
                    _id: "b101",
                    title: "Robot dev proj",
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
                                    priority: "unset",
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
                },
                {
                    _id: "b102",
                    title: "AI dev proj",
                    isStarred: true,
                    archivedAt: 1589983468520,
                    createdBy: {
                        _id: "u102",
                        fullname: "Joe Johnson",
                        imgUrl: "http://another-img"
                    },
                    style: {
                        backgroundImage: ""
                    },
                    labels: [
                        {
                            id: "l103",
                            title: "Started",
                            color: "#f44236"
                        },
                        {
                            id: "l104",
                            title: "On-hold",
                            color: "#ff9800"
                        }
                    ],
                    members: [
                        {
                            _id: "u103",
                            fullname: "Jane Doe",
                            imgUrl: "https://www.bing.com"
                        }
                    ],
                    groups: [
                        {
                            id: "g103",
                            title: "Group A",
                            archivedAt: 1589983468520,
                            tasks: [
                                {
                                    id: "c105",
                                    title: "Design Layout"
                                },
                                {
                                    id: "c106",
                                    title: "Refactor Code"
                                }
                            ],
                            style: {}
                        },
                        {
                            id: "g104",
                            title: "Group B",
                            tasks: [
                                {
                                    id: "c107",
                                    title: "Brainstorm ideas",
                                    archivedAt: 1589983468520
                                },
                                {
                                    id: "c108",
                                    title: "Document features",
                                    status: "started",
                                    priority: "medium",
                                    description: "brief description",
                                    comments: [
                                        {
                                            id: "ZdOlo",
                                            txt: "@janed please review this",
                                            createdAt: 1590999817537,
                                            byMember: {
                                                _id: "u103",
                                                fullname: "Jane Doe",
                                                imgUrl: "http://another-cloudinary-image.jpg"
                                            }
                                        }
                                    ],
                                    checklists: [
                                        {
                                            id: "ZEpqS",
                                            title: "TaskList",
                                            todos: [
                                                {
                                                    id: "313kY",
                                                    title: "To Do A",
                                                    isDone: true
                                                }
                                            ]
                                        }
                                    ],
                                    memberIds: ["u103"],
                                    labelIds: ["l103", "l104"],
                                    dueDate: 16156215322,
                                    byMember: {
                                        _id: "u103",
                                        username: "Jane",
                                        fullname: "Jane Doe",
                                        imgUrl: "http://another-cloudinary-image.jpg"
                                    },
                                    style: {
                                        backgroundColor: "#f7c744"
                                    }
                                }
                            ],
                            style: {}
                        }
                    ],
                    activities: [
                        {
                            id: "a102",
                            txt: "Added Task",
                            createdAt: 154515,
                            byMember: {
                                _id: "u102",
                                fullname: "Joe Johnson",
                                imgUrl: "http://another-img"
                            },
                            group: {
                                id: "g103",
                                title: "Critical Tasks"
                            },
                            task: {
                                id: "c105",
                                title: "Design Layout"
                            }
                        }
                    ],
                    cmpsOrder: ["MemberPicker", "StatusPicker", "DatePicker"]
                },
                {
                    _id: "b103",
                    title: "Data Science proj",
                    isStarred: true,
                    archivedAt: 1590010000000,
                    createdBy: {
                        _id: "u104",
                        fullname: "Liam Nelson",
                        imgUrl: "http://yet-another-img"
                    },
                    style: {
                        backgroundImage: ""
                    },
                    labels: [
                        {
                            id: "l105",
                            title: "In-Review",
                            color: "#9c27b0"
                        },
                        {
                            id: "l106",
                            title: "Testing",
                            color: "#009688"
                        }
                    ],
                    members: [
                        {
                            _id: "u105",
                            fullname: "Emma Stone",
                            imgUrl: "https://www.yahoo.com"
                        }
                    ],
                    groups: [
                        {
                            id: "g105",
                            title: "Group X",
                            archivedAt: 1590010000000,
                            tasks: [
                                {
                                    id: "c109",
                                    title: "Analyze Data"
                                },
                                {
                                    id: "c110",
                                    title: "Create Visualization"
                                },
                                {
                                    id: "c111",
                                    title: "Write Report"
                                },
                                {
                                    id: "c112",
                                    title: "Gather Feedback"
                                }
                            ],
                            style: {}
                        },
                        {
                            id: "g106",
                            title: "Group Y",
                            tasks: [
                                {
                                    id: "c113",
                                    title: "Set up Environment",
                                    archivedAt: 1590010000000
                                },
                                {
                                    id: "c114",
                                    title: "Review Code",
                                    status: "pending",
                                    priority: "low",
                                    description: "Check for bugs",
                                    comments: [
                                        {
                                            id: "LmPqr",
                                            txt: "@emmast please have a look",
                                            createdAt: 1591022222222,
                                            byMember: {
                                                _id: "u105",
                                                fullname: "Emma Stone",
                                                imgUrl: "http://yet-another-cloudinary-image.jpg"
                                            }
                                        }
                                    ],
                                    checklists: [
                                        {
                                            id: "WtZrX",
                                            title: "Code Review",
                                            todos: [
                                                {
                                                    id: "414lM",
                                                    title: "Check Functions",
                                                    isDone: false
                                                },
                                                {
                                                    id: "415lN",
                                                    title: "Check Variables",
                                                    isDone: true
                                                }
                                            ]
                                        }
                                    ],
                                    memberIds: ["u105"],
                                    labelIds: ["l105", "l106"],
                                    dueDate: 1615655555555,
                                    byMember: {
                                        _id: "u105",
                                        username: "Emma",
                                        fullname: "Emma Stone",
                                        imgUrl: "http://yet-another-cloudinary-image.jpg"
                                    },
                                    style: {
                                        backgroundColor: "#ff5722"
                                    }
                                }
                            ],
                            style: {}
                        }
                    ],
                    activities: [
                        {
                            id: "a103",
                            txt: "Updated Task",
                            createdAt: 154550,
                            byMember: {
                                _id: "u104",
                                fullname: "Liam Nelson",
                                imgUrl: "http://yet-another-img"
                            },
                            group: {
                                id: "g105",
                                title: "Important Tasks"
                            },
                            task: {
                                id: "c109",
                                title: "Analyze Data"
                            }
                        }
                    ],
                    cmpsOrder: ["DatePicker", "MemberPicker", "StatusPicker"]
                },
                {
                    _id: "b104",
                    title: "Web Design proj",
                    isStarred: false,
                    archivedAt: 1590500000000,
                    createdBy: {
                        _id: "u106",
                        fullname: "Lucy Williams",
                        imgUrl: "http://different-img-url"
                    },
                    style: {
                        backgroundImage: ""
                    },
                    labels: [
                        {
                            id: "l107",
                            title: "Concept",
                            color: "#e91e63"
                        },
                        {
                            id: "l108",
                            title: "Feedback",
                            color: "#ffc107"
                        }
                    ],
                    members: [
                        {
                            _id: "u107",
                            fullname: "Mike Brown",
                            imgUrl: "https://www.duckduckgo.com"
                        }
                    ],
                    groups: [
                        {
                            id: "g107",
                            title: "Frontend Tasks",
                            archivedAt: 1590500000000,
                            tasks: [
                                {
                                    id: "c115",
                                    title: "Design Landing Page"
                                },
                                {
                                    id: "c116",
                                    title: "Create Navigation"
                                },
                                {
                                    id: "c117",
                                    title: "Implement Animations"
                                },
                                {
                                    id: "c118",
                                    title: "Optimize for Mobile"
                                }
                            ],
                            style: {}
                        },
                        {
                            id: "g108",
                            title: "Backend Tasks",
                            tasks: [
                                {
                                    id: "c119",
                                    title: "Set up Database",
                                    archivedAt: 1590500000000
                                },
                                {
                                    id: "c120",
                                    title: "Create API Endpoints",
                                    status: "completed",
                                    priority: "unset",
                                    description: "Endpoints for CRUD operations",
                                    comments: [
                                        {
                                            id: "RtUvw",
                                            txt: "@mikeb can you test the endpoints?",
                                            createdAt: 1591503333333,
                                            byMember: {
                                                _id: "u107",
                                                fullname: "Mike Brown",
                                                imgUrl: "http://different-cloudinary-url.jpg"
                                            }
                                        }
                                    ],
                                    checklists: [
                                        {
                                            id: "XsYtZ",
                                            title: "API Tests",
                                            todos: [
                                                {
                                                    id: "516oO",
                                                    title: "Test GET request",
                                                    isDone: true
                                                },
                                                {
                                                    id: "517pP",
                                                    title: "Test POST request",
                                                    isDone: false
                                                }
                                            ]
                                        }
                                    ],
                                    memberIds: ["u107"],
                                    labelIds: ["l107", "l108"],
                                    dueDate: 1615700000000,
                                    byMember: {
                                        _id: "u107",
                                        username: "Mike",
                                        fullname: "Mike Brown",
                                        imgUrl: "http://different-cloudinary-url.jpg"
                                    },
                                    style: {
                                        backgroundColor: "#4caf50"
                                    }
                                }
                            ],
                            style: {}
                        }
                    ],
                    activities: [
                        {
                            id: "a104",
                            txt: "Added New Design",
                            createdAt: 154580,
                            byMember: {
                                _id: "u106",
                                fullname: "Lucy Williams",
                                imgUrl: "http://different-img-url"
                            },
                            group: {
                                id: "g107",
                                title: "Design Updates"
                            },
                            task: {
                                id: "c115",
                                title: "Design Landing Page"
                            }
                        }
                    ],
                    cmpsOrder: ["MemberPicker", "DatePicker", "StatusPicker"]
                }
            ]

        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}



