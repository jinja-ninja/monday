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
    duplicateBoard,
    addNewGroup,
    removeGroup,
    duplicatedGroup,
    getGroupById,
    getTaskById,
    removeTask,
    addTask,
    duplicatedTask,
    createNewComment,
    deleteComment,
    createActivity,
    getMemberById,
    getMembers,
    removeBatchTasks,
    duplicateBatchTasks,
    getLabels,
    getLabelById,
    addLabel,
    removeLabel,
    updateLabel,
    getEmptyGroup,
    getEmptyTask,
    getEmptyLabel,
    getContentColors,
    _createBoards,
}

_createBoards()

// General Update function
async function update(type, boardId, groupId = null, taskId = null, { key, value }) {
    try {

        const board = await getBoardById(boardId)
        const activityType = getActivityType(key)
        let groupIdx, taskIdx, activity

        switch (type) {
            case 'board':
                if (!boardId) throw new Error('Error updating')
                board[key] = value
                break

            case 'group':
                if (!groupId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                const oldGroup = board.groups[groupIdx]
                board.groups[groupIdx][key] = value

                activity = createActivity({ type: activityType, from: oldGroup, to: value }, board._id, groupId)
                board.activities.unshift(activity)
                break

            case 'task':
                if (!taskId) throw new Error('Error updating')
                groupIdx = board.groups.findIndex(group => group.id === groupId)
                taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
                const oldTask = board.groups[groupIdx].tasks[taskIdx][key]
                board.groups[groupIdx].tasks[taskIdx][key] = value

                activity = await createActivity({ type: activityType, from: oldTask, to: value }, boardId, groupId, taskId)
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

async function getBoardById(boardId, filterBy = { txt: '', person: null }) {
    let board = await storageService.get(STORAGE_KEY, boardId)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        board.groups = board.groups.map((group) => {
            const filteredTasks = group.tasks.filter((task) => regex.test(task.title))

            // If there are matching tasks or the group title matches, include the group
            if (filteredTasks.length > 0 || regex.test(group.title)) {
                if (filteredTasks.length > 0) {
                    group.tasks = filteredTasks
                }
                return group;
            }
            // If no matching tasks and group title doesn't match, exclude the group
            return null
        }).filter((group) => group !== null) // Remove groups without matching tasks or title
    }

    if (filterBy.person) {
        board.groups = board.groups.map((group) => {
            const filteredTasks = group.tasks.filter((task) => task.memberIds.includes(filterBy.person._id));

            // Include the group if there are matching tasks
            if (filteredTasks.length > 0) {
                group.tasks = filteredTasks;
                return group;
            }
            // Exclude the group if no matching tasks
            return null;
        }).filter((group) => group !== null); // Remove groups without matching tasks
    }

    return board;

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
                id: "l100",
                title: "",
                color: "explosive"
            },
            {
                id: "l101",
                title: "Done",
                color: "done-green"
            },
            {
                id: "l102",
                title: "Progress",
                color: "working_orange"
            },
            {
                id: "l103",
                title: "Stuck",
                color: "stuck-red"
            }
        ],
        members: [
            {
                _id: "u101",
                fullname: "Gal Ben Natan",
                imgUrl: "https://www.google.com"
            },
            {
                _id: "u102",
                fullname: "Omer Vered",
                imgUrl: "https://www.google.com"
            },
            {
                _id: "u103",
                fullname: "Nati Feldbaum",
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
                        title: "Type your task here",
                        comments: [],
                        priority: "",
                        status: "",
                        dueDate: undefined,
                        memberIds: []
                    },
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        comments: [],
                        priority: "",
                        status: "",
                        dueDate: undefined,
                        memberIds: []
                    }
                ],
                style: "grass_green"
            },
            {
                id: utilService.makeId(),
                title: "Group 2",
                tasks: [
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        archivedAt: '',
                        comments: [],
                        priority: "",
                        status: "",
                        memberIds: []
                    },
                    {
                        id: utilService.makeId(),
                        title: "Type your task here",
                        priority: "",
                        status: "",
                        dueDate: undefined,
                        description: "description",
                        comments: [],
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
                        memberIds: [],
                        labelIds: ["l101", "l102"],
                        byMember: {
                            _id: "u101",
                            username: "Gal",
                            fullname: "Gal Ben Natan",
                            imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        style: {
                            backgroundColor: "done-green"
                        }
                    }
                ],
                style: "peach"
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
                    title: "Replace Logo",
                    comments: []
                }
            }
        ],
        priorities: [

            {
                id: "p100",
                title: "Critical",
                color: "blackish"
            },
            {
                id: "p101",
                title: "High",
                color: "dark_indigo"
            },
            {
                id: "p102",
                title: "Medium",
                color: "indigo"
            },
            {
                id: "p103",
                title: "Low",
                color: "bright-blue"
            },
            {
                id: "p105",
                title: "",
                color: "explosive"
            }

        ],
        cmpsOrder: [
            "side",
            "title",
            "members",
            "status",
            "priority",
            "dueDate",
            "timeline",
            "files"
        ]
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
        id: utilService.makeTaskId(),
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
//Activity functions
async function createActivity(action = {}, boardId, groupId = null, taskId = null) {
    return {
        id: 'a-' + utilService.makeId(),
        createdAt: Date.now(),
        byMember: {
            _id: 'u101',
            fullname: 'Default user',
            imgUrl: 'https://cdn1.monday.com/dapulse_default_photo.png'
        },
        boardId,
        groupId,
        taskId,
        action,
        group: groupId ? await getGroupById(boardId, groupId) : null,
        task: taskId ? await getTaskById(boardId, groupId, taskId) : null
    }
}

function getActivityType(key) {
    switch (key) {
        case 'title':
            return 'Name'
        case 'status':
            return 'Status'
        case 'priority':
            return 'Priority'
        case 'dueDate':
            return 'Date'
        default:
            throw new Error('Error updating')
    }
}

//Group functions
function getEmptyGroup() {
    return {
        id: utilService.makeGroupId(),
        title: 'New Group',
        tasks: [],
        style: "done-green",
        archivedAt: null,
    }
}

async function addNewGroup(board) {

    const newGroup = getEmptyGroup()
    const updatedBoard = { ...board }
    updatedBoard.groups.push(newGroup)

    const activity = await createActivity({ type: 'Created', from: null, to: newGroup.title }, board._id, newGroup.id)
    activity.group = newGroup
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

async function getGroupById(boardId, groupId) {
    // const newBoard = structuredClone(board)
    const board = await getBoardById(boardId)
    return board.groups.find(group => group.id === groupId)
}

//Task functions
async function getTaskById(boardId, groupId, taskId) {
    const board = await getBoardById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    return board.groups[groupIdx].tasks[taskIdx]
}

async function addTask(boardId, groupId, task, fromBtn) {

    const board = await getBoardById(boardId)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)

    let pushOrUnshift = fromBtn ? 'unshift' : 'push'

    board.groups[groupIdx].tasks[pushOrUnshift](task)

    const activity = createActivity(`Added task ${task.title}`, boardId, groupId, task.id)
    board.activities.unshift(activity)

    return await storageService.put(STORAGE_KEY, board)
}

async function removeTask(boardId, groupId, taskId) {
    const board = await getBoardById(boardId)
    console.log('board:', board)
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const taskIdx = board.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    const task = board.groups[groupIdx].tasks[taskIdx]
    board.groups[groupIdx].tasks.splice(taskIdx, 1)
    console.log('removing task:', board)
    const activity = createActivity(`Removed task ${task.title}`, boardId, groupId, taskId)
    board.activities.unshift(activity)

    return await storageService.put(STORAGE_KEY, board)
}

async function removeBatchTasks(boardId, selectedTasks, actions = []) {
    const taskIds = selectedTasks.map(task => task.taskId)
    try {
        const board = await getBoardById(boardId)
        board.groups = board.groups.map(group => ({
            ...group, tasks: group.tasks.filter(t => {
                const keepTask = !taskIds.includes(t.id)
                // if (!keepTask) {
                // 	const activity = getEmptyActivity(board, t.id, actions.splice(0, 1)[0]) // splice first item, and send it to getEmptyActivity
                // 	board.activities.unshift(activity)
                // }
                return keepTask
            }),
        }))
        return await storageService.put(STORAGE_KEY, board)
    } catch (err) {
        throw err
    }
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

async function duplicateBatchTasks(boardId, selectedTasks, actions = []) {
    const taskIds = selectedTasks.map(task => task.taskId)
    console.log('taskIds:', taskIds)
    try {
        const board = await getBoardById(boardId)
        const updatedBoard = { ...board }

        selectedTasks.forEach(({ groupId, taskId }) => {
            const groupIdx = updatedBoard.groups.findIndex(group => group.id === groupId)
            const taskIdx = updatedBoard.groups[groupIdx].tasks.findIndex(task => task.id === taskId)

            if (groupIdx !== -1 && taskIdx !== -1) {
                const taskToDuplicate = updatedBoard.groups[groupIdx].tasks[taskIdx]
                const duplicatedTask = JSON.parse(JSON.stringify(taskToDuplicate))
                duplicatedTask.id = utilService.makeId()
                duplicatedTask.title = duplicatedTask.title + ' copy'
                updatedBoard.groups[groupIdx].tasks.splice(taskIdx + 1, 0, duplicatedTask)
            }
        })

        return await storageService.put(STORAGE_KEY, updatedBoard)
    } catch (err) {
        throw err
    }
}

//Label functions
async function getEmptyLabel() {
    return {
        id: utilService.makeId(),
        title: '',
        color: getContentColors()[utilService.getRandomIntInclusive(0, getContentColors().length - 1)]
    }
}

async function getLabels(boardId) {
    const board = await getBoardById(boardId)
    return board.labels
}

async function getLabelById(boardId, labelId) {
    const board = await getBoardById(boardId)
    const label = board.labels.find(label => label.id === labelId)
    return label
}

async function addLabel(boardId, label) {
    const board = await getBoardById(boardId)
    board.labels.push(label)
    return await storageService.put(STORAGE_KEY, board)
}

async function removeLabel(boardId, labelId) {
    const board = await getBoardById(boardId)
    const labelIdx = board.labels.findIndex(label => label.id === labelId)
    board.labels.splice(labelIdx, 1)
    return await storageService.put(STORAGE_KEY, board)
}

async function updateLabel(boardId, label) {
    const board = await getBoardById(boardId)
    const labelId = label.id
    const labelIdx = board.labels.findIndex(label => label.id === labelId)
    board.labels[labelIdx] = label
    return await storageService.put(STORAGE_KEY, board)
}

//Comment functions
function createNewComment(newCommentText) {
    return {
        id: utilService.makeId(),
        txt: newCommentText,
        createdAt: Date.now(),
        byMember: {
            _id: "u101",
            fullname: "Gal Ben Natan",
            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
        }
    }

}

function deleteComment(commentId, currTask) {
    const commentIdx = currTask.comments.findIndex(comment => commentId === comment.id)
    if (commentIdx !== -1) {
        const commentsAfterDelete = currTask.comments.filter(comment => commentId !== comment.id)
        return commentsAfterDelete
    } else {
        console.log('cant find comment')
        throw new Error('comment wasnt found,couldnt delete it')
    }

}

//Member functions
async function getMembers(boardId) {
    const board = await getBoardById(boardId)
    return board.members
}

async function getMemberById(boardId, memberId) {
    const board = await getBoardById(boardId)
    const member = board.members.find(member => member._id === memberId)
    return member
}

//General functions
function getContentColors() {
    const contentColors = [
        'grass_green',
        'done-green',
        'bright-green',
        'saladish',
        'egg_yolk',
        'working_orange',
        'dark-orange',
        'peach',
        'sunset',
        'stuck-red',
        'dark-red',
        'sofia_pink',
        'lipstick',
        'bubble',
        'purple',
        'dark_purple',
        'berry',
        'dark_indigo',
        'indigo',
        'navy',
        'bright-blue',
        'dark-blue',
        'aquamarine',
        'chili-blue',
        'river',
        'winter',
        'explosive',
        'american_gray',
        'blackish',
        'brown',
        'orchid',
        'tan',
        'sky',
        'coffee',
        'royal',
        'teal',
        'lavender',
        'steel',
        'lilac',
        'pecan'
    ]

    return contentColors
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
                        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                    },
                    style: {
                        backgroundImage: ""
                    },
                    labels: [
                        {
                            id: "l100",
                            title: "",
                            color: "explosive"
                        },
                        {
                            id: "l101",
                            title: "Done",
                            color: "done-green"
                        },
                        {
                            id: "l102",
                            title: "Progress",
                            color: "working_orange"
                        },
                        {
                            id: "l103",
                            title: "Stuck",
                            color: "stuck-red"
                        }
                    ],
                    members: [
                        {
                            _id: "u101",
                            fullname: "Gal Ben Natan",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u102",
                            fullname: "Omer Vered",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u103",
                            fullname: "Nati Feldbaum",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
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
                                    title: "Replace logo",
                                    comments: [],
                                    priority: "Medium",
                                    status: "Done",
                                    dueDate: undefined,
                                    memberIds: []
                                },
                                {
                                    id: "c102",
                                    title: "Add Samples",
                                    comments: [],
                                    priority: "Low",
                                    status: "Progress",
                                    dueDate: undefined,
                                    memberIds: []
                                }
                            ],
                            style: "grass_green"
                        },
                        {
                            id: "g102",
                            title: "Group 2",
                            tasks: [
                                {
                                    id: "c103",
                                    title: "Do that",
                                    comments: [],
                                    archivedAt: 1589983468418,
                                    priority: "High",
                                    status: "Stuck",
                                    dueDate: undefined,
                                    memberIds: []
                                },
                                {
                                    id: "c104",
                                    title: "Help me",
                                    status: "Progress",
                                    priority: "Critical",
                                    dueDate: 16156215211,
                                    description: "description",
                                    comments: [
                                        {
                                            id: "ZdPnm",
                                            txt: "also @yaronb please CR this",
                                            createdAt: 1590999817436,
                                            byMember: {
                                                _id: "u101",
                                                fullname: "Gal Ben Natan",
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
                                    byMember: {
                                        _id: "u101",
                                        username: "Gal",
                                        fullname: "Gal Ben Natan",
                                        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    },
                                    style: {
                                        backgroundColor: "done-green"
                                    }
                                },
                                {
                                    id: "c105",
                                    title: "Change that",
                                    status: "Done",
                                    priority: "",
                                    dueDate: 16156215211,
                                    description: "description",
                                    comments: [
                                        {
                                            id: "ZdPnm",
                                            txt: "also @yaronb please CR this",
                                            createdAt: 1590999817436,
                                            byMember: {
                                                _id: "u101",
                                                fullname: "Gal Ben Natan",
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
                                    labelIds: ["l103", "l101"],
                                    byMember: {
                                        _id: "u101",
                                        username: "Gal",
                                        fullname: "Gal Ben Natan",
                                        imgUrl: "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                    },
                                    style: {
                                        backgroundColor: "done-green"
                                    }
                                }
                            ],
                            style: "bright-blue"
                        }
                    ],
                    activities: [
                        {
                            id: 'a101',
                            createdAt: 1698500764637,
                            byMember: {
                                _id: 'u101',
                                fullname: 'Default User',
                                imgUrl: 'https://cdn1.monday.com/dapulse_default_photo.png'
                            },
                            action: { type: 'Update', from: '', to: 'Replace logo' },
                            group: {
                                id: "g101",
                                title: "Group 1",
                                archivedAt: 1589983468418,
                                tasks: [
                                    {
                                        id: "c101",
                                        title: "Replace logo",
                                        comments: [],
                                        priority: "Medium",
                                        status: "Done",
                                        dueDate: undefined,
                                        memberIds: []
                                    },
                                    {
                                        id: "c102",
                                        title: "Add Samples",
                                        comments: [],
                                        priority: "Low",
                                        status: "Progress",
                                        dueDate: undefined,
                                        memberIds: []
                                    }
                                ],
                                style: "grass_green"
                            },
                            task: {
                                id: "c101",
                                title: "Replace logo",
                                comments: [],
                                priority: "Medium",
                                status: "Done",
                                dueDate: undefined,
                                memberIds: []
                            },
                        }
                    ],
                    priorities: [

                        {
                            id: "p100",
                            title: "Critical",
                            color: "blackish"
                        },
                        {
                            id: "p101",
                            title: "High",
                            color: "dark_indigo"
                        },
                        {
                            id: "p102",
                            title: "Medium",
                            color: "indigo"
                        },
                        {
                            id: "p103",
                            title: "Low",
                            color: "bright-blue"
                        },
                        {
                            id: "p105",
                            title: "",
                            color: "explosive"
                        }

                    ],
                    cmpsOrder: [
                        "side",
                        "title",
                        "members",
                        "status",
                        "priority",
                        "dueDate",
                        "timeline",
                        "files"
                    ]
                },
                {
                    _id: "b102",
                    title: "AI dev proj",
                    isStarred: true,
                    archivedAt: 1589983468520,
                    createdBy: {
                        _id: "u102",
                        fullname: "Joe Johnson",
                        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                    },
                    style: {
                        backgroundImage: ""
                    },
                    labels: [
                        {
                            id: "l100",
                            title: "",
                            color: "explosive"
                        },
                        {
                            id: "l101",
                            title: "Done",
                            color: "done-green"
                        },
                        {
                            id: "l102",
                            title: "Progress",
                            color: "working_orange"
                        },
                        {
                            id: "l103",
                            title: "Stuck",
                            color: "stuck-red"
                        }
                    ],
                    members: [
                        {
                            _id: "u101",
                            fullname: "Gal Ben Natan",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u102",
                            fullname: "Omer Vered",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u103",
                            fullname: "Nati Feldbaum",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
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
                                    title: "Design Layout",
                                    comments: [],
                                    priority: "Medium",
                                    status: "Done",
                                    memberIds: []
                                },
                                {
                                    id: "c106",
                                    title: "Refactor Code",
                                    comments: [],
                                    priority: "Low",
                                    status: "Progress",
                                    memberIds: []
                                }
                            ],
                            style: "grass_green"
                        },
                        {
                            id: "g104",
                            title: "Group B",
                            tasks: [
                                {
                                    id: "c107",
                                    title: "Brainstorm ideas",
                                    archivedAt: 1589983468520,
                                    comments: [],
                                    priority: "High",
                                    status: "Stuck",
                                    memberIds: []
                                },
                                {
                                    id: "c108",
                                    title: "Document features",
                                    status: "Progress",
                                    priority: "Critical",
                                    description: "brief description",
                                    comments: [
                                        {
                                            id: "ZdOlo",
                                            txt: "@janed please review this",
                                            createdAt: 1590999817537,
                                            byMember: {
                                                _id: "u103",
                                                fullname: "Jane Doe",
                                                imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
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
                                    byMember: {
                                        _id: "u103",
                                        username: "Jane",
                                        fullname: "Jane Doe",
                                        imgUrl: "http://another-cloudinary-image.jpg"
                                    },
                                    style: {
                                        backgroundColor: "done-green"
                                    }
                                }
                            ],
                            style: "dark_indigo"
                        }
                    ],
                    activities: [
                        {
                            id: "a102",
                            txt: "Added Task",
                            createdAt: 1698500721637,
                            byMember: {
                                _id: "u102",
                                fullname: "Joe Johnson",
                                imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                            },
                            group: {
                                id: "g103",
                                title: "Critical Tasks"
                            },
                            task: {
                                id: "c105",
                                title: "Design Layout",
                                comments: []
                            }
                        }
                    ],
                    priorities: [

                        {
                            id: "p100",
                            title: "Critical",
                            color: "blackish"
                        },
                        {
                            id: "p101",
                            title: "High",
                            color: "dark_indigo"
                        },
                        {
                            id: "p102",
                            title: "Medium",
                            color: "indigo"
                        },
                        {
                            id: "p103",
                            title: "Low",
                            color: "bright-blue"
                        },
                        {
                            id: "p105",
                            title: "",
                            color: "explosive"
                        }

                    ],
                    cmpsOrder: [
                        "side",
                        "title",
                        "members",
                        "status",
                        "priority",
                        "dueDate",
                        "timeline",
                        "files"
                    ]
                },
                {
                    _id: "b103",
                    title: "Data Science proj",
                    isStarred: true,
                    archivedAt: 1590010000000,
                    createdBy: {
                        _id: "u104",
                        fullname: "Liam Nelson",
                        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                    },
                    style: {
                        backgroundImage: ""
                    },
                    labels: [
                        {
                            id: "l100",
                            title: "",
                            color: "explosive"
                        },
                        {
                            id: "l101",
                            title: "Done",
                            color: "done-green"
                        },
                        {
                            id: "l102",
                            title: "Progress",
                            color: "working_orange"
                        },
                        {
                            id: "l103",
                            title: "Stuck",
                            color: "stuck-red"
                        }
                    ],
                    members: [
                        {
                            _id: "u101",
                            fullname: "Gal Ben Natan",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u102",
                            fullname: "Omer Vered",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u103",
                            fullname: "Nati Feldbaum",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
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
                                    title: "Analyze Data",
                                    comments: [],
                                    priority: "Low",
                                    status: "Done",
                                    dueDate: undefined,
                                    memberIds: []
                                },
                                {
                                    id: "c110",
                                    title: "Create Visualization",
                                    comments: [],
                                    priority: "Medium",
                                    status: "Progress",
                                    dueDate: undefined,
                                    memberIds: []
                                },
                                {
                                    id: "c111",
                                    title: "Write Report",
                                    comments: [],
                                    priority: "Medium",
                                    status: "Done",
                                    dueDate: undefined,
                                    memberIds: []

                                },
                                {
                                    id: "c112",
                                    title: "Gather Feedback",
                                    comments: [],
                                    priority: "Low",
                                    status: "Stuck",
                                    dueDate: undefined,
                                    memberIds: []
                                }
                            ],
                            style: "dark-orange"
                        },
                        {
                            id: "g106",
                            title: "Group Y",
                            tasks: [
                                {
                                    id: "c113",
                                    title: "Set up Environment",
                                    comments: [],
                                    archivedAt: 1590010000000,
                                    priority: "High",
                                    status: "Stuck",
                                    memberIds: []
                                },
                                {
                                    id: "c114",
                                    title: "Review Code",
                                    status: "Progress",
                                    priority: "Critical",
                                    dueDate: 1615655555555,
                                    memberIds: ["u102"],
                                    description: "Check for bugs",
                                    comments: [
                                        {
                                            id: "LmPqr",
                                            txt: "@emmast please have a look",
                                            createdAt: 1591022222222,
                                            byMember: {
                                                _id: "u105",
                                                fullname: "Emma Stone",
                                                imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
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
                                    labelIds: ["l105", "l106"],
                                    byMember: {
                                        _id: "u105",
                                        username: "Emma",
                                        fullname: "Emma Stone",
                                        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                                    },
                                    style: {
                                        backgroundColor: "bright-green"
                                    }
                                }
                            ],
                            style: "bright-green"
                        }
                    ],
                    activities: [
                        {
                            id: "a103",
                            txt: "Updated Task",
                            createdAt: 1698500524637,
                            byMember: {
                                _id: "u104",
                                fullname: "Liam Nelson",
                                imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                            },
                            group: {
                                id: "g105",
                                title: "Important Tasks"
                            },
                            task: {
                                id: "c109",
                                title: "Analyze Data",
                                comments: []
                            }
                        }
                    ],
                    priorities: [

                        {
                            id: "p100",
                            title: "Critical",
                            color: "blackish"
                        },
                        {
                            id: "p101",
                            title: "High",
                            color: "dark_indigo"
                        },
                        {
                            id: "p102",
                            title: "Medium",
                            color: "indigo"
                        },
                        {
                            id: "p103",
                            title: "Low",
                            color: "bright-blue"
                        },
                        {
                            id: "p105",
                            title: "",
                            color: "explosive"
                        }

                    ],
                    cmpsOrder: [
                        "side",
                        "title",
                        "members",
                        "status",
                        "priority",
                        "dueDate",
                        "timeline",
                        "files"
                    ]
                },
                {
                    _id: "b104",
                    title: "Web Design proj",
                    isStarred: false,
                    archivedAt: 1590500000000,
                    createdBy: {
                        _id: "u106",
                        fullname: "Lucy Williams",
                        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                    },
                    style: {
                        backgroundImage: ""
                    },
                    labels: [
                        {
                            id: "l100",
                            title: "",
                            color: "explosive"
                        },
                        {
                            id: "l101",
                            title: "Done",
                            color: "done-green"
                        },
                        {
                            id: "l102",
                            title: "Progress",
                            color: "working_orange"
                        },
                        {
                            id: "l103",
                            title: "Stuck",
                            color: "stuck-red"
                        }
                    ],
                    members: [
                        {
                            _id: "u101",
                            fullname: "Gal Ben Natan",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u102",
                            fullname: "Omer Vered",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                        },
                        {
                            _id: "u103",
                            fullname: "Nati Feldbaum",
                            imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
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
                                    title: "Design Landing Page",
                                    comments: [],
                                    priority: "Medium",
                                    status: "Done",
                                    date: '',
                                    memberIds: []
                                },
                                {
                                    id: "c116",
                                    title: "Create Navigation",
                                    comments: [],
                                    priority: "Low",
                                    status: "Stuck",
                                    memberIds: []
                                },
                                {
                                    id: "c117",
                                    title: "Implement Animations",
                                    comments: [],
                                    priority: "Low",
                                    status: "Progress",
                                    memberIds: []
                                },
                                {
                                    id: "c118",
                                    title: "Optimize for Mobile",
                                    comments: [],
                                    priority: "Medium",
                                    status: "Done",
                                    memberIds: []
                                }
                            ],
                            style: "stuck-red"
                        },
                        {
                            id: "g108",
                            title: "Backend Tasks",
                            tasks: [
                                {
                                    id: "c119",
                                    title: "Set up Database",
                                    comments: [],
                                    priority: "High",
                                    status: "Stuck",
                                    archivedAt: 1590500000000,
                                    memberIds: []
                                },
                                {
                                    id: "c120",
                                    title: "Create API Endpoints",
                                    status: "Progress",
                                    priority: "Critical",
                                    dueDate: undefined,
                                    memberIds: ["u101"],
                                    description: "Endpoints for CRUD operations",
                                    comments: [
                                        {
                                            id: "RtUvw",
                                            txt: "@mikeb can you test the endpoints?",
                                            createdAt: 1591503333333,
                                            byMember: {
                                                _id: "u107",
                                                fullname: "Mike Brown",
                                                imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
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
                                    labelIds: ["l107", "l108"],
                                    byMember: {
                                        _id: "u107",
                                        username: "Mike",
                                        fullname: "Mike Brown",
                                        imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                                    },
                                    style: {
                                        backgroundColor: "done-green"
                                    }
                                }
                            ],
                            style: "dark-blue"
                        }
                    ],
                    activities: [
                        {
                            id: "a104",
                            txt: "Added New Design",
                            createdAt: 1698500724637,
                            byMember: {
                                _id: "u106",
                                fullname: "Lucy Williams",
                                imgUrl: "https://cdn1.monday.com/dapulse_default_photo.png"
                            },
                            group: {
                                id: "g107",
                                title: "Design Updates"
                            },
                            task: {
                                id: "c115",
                                title: "Design Landing Page",
                                comments: []
                            }
                        }
                    ],
                    priorities: [
                        {
                            id: "p100",
                            title: "Critical",
                            color: "blackish"
                        },
                        {
                            id: "p101",
                            title: "High",
                            color: "dark_indigo"
                        },
                        {
                            id: "p102",
                            title: "Medium",
                            color: "indigo"
                        },
                        {
                            id: "p103",
                            title: "Low",
                            color: "bright-blue"
                        },
                        {
                            id: "p105",
                            title: "",
                            color: "explosive"
                        }

                    ],
                    cmpsOrder: [
                        "side",
                        "title",
                        "members",
                        "status",
                        "priority",
                        "dueDate",
                        "timeline",
                        "files"
                    ]
                }
            ]

        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}