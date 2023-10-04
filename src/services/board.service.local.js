import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'boardDB'

export const boardService = {
    query,
    getBoardById,
    save,
    remove,
    getEmptyBoard,
    _createBoards
}


_createBoards()


async function query() {
    const boards = await storageService.query(STORAGE_KEY)
    return boards
}

async function getBoardById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    return board
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





function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    console.log('boards:', boards)
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
                                    priority: "high",
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



