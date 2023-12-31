import { useSelector } from "react-redux"
import { addTask, loadBoard } from "../../store/actions/board.action"
import { useEffect, useState } from "react"
import MondayLoader from '../../assets/Loader/MondayLoader.gif'
import { Group, Search, Sort } from "monday-ui-react-core/icons"
import { Button, MenuItem, SplitButton, SplitButtonMenu, Search as SearchInput } from "monday-ui-react-core"
import { KanbanGroupList } from "./KanbanGroupList"
import { boardService } from "../../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { useParams } from "react-router-dom"


export function KanbanDetails({ isCollapse }) {
    const currBoard = useSelector(state => state.boardModule.board)
    const [isSearch, setIsSearch] = useState(false)
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const params = useParams()

    const groups = getOrderedGroups(getKanbanGroups())

    useEffect(() => {
        loadBoard(params.boardId)
    }, [params.boardId], filterBy, currBoard)

    function getAllBoardTasks() {
        let allTasks = currBoard.groups.reduce((accumulator, group) => {
            return accumulator.concat(group.tasks.map(task => ({
                ...task,
                groupId: group.id
            })))
        }, [])
        return allTasks
    }

    function getKanbanGroups() {
        let allTasks = getAllBoardTasks()

        const filterPattern = new RegExp(filterBy.txt, 'i')
        let filteredTasks = allTasks.filter(task => filterPattern.test(task.title))

        let groups = filteredTasks.reduce((acc, task) => {
            const status = task.status || ''
            if (!acc[status]) acc[status] = { name: status, tasks: [] }
            acc[status].tasks.push(task)
            return acc
        }, {})

        let kanbanGroups = Object.values(groups)
        return kanbanGroups
    }

    function getLabelsInUse() {
        let allTasksLabels = getAllBoardTasks().map(task => task.status)
        const uniqueLabels = [...new Set(allTasksLabels)]
        return uniqueLabels
    }

    function getOrderedGroups(groups) {
        const labelsInUse = getLabelsInUse()
        const orderFromBoard = currBoard.kanbanCmpsOrder || []
        const getIndexInOrder = (label) => orderFromBoard.findIndex(orderLabel => orderLabel === label)
        const sortedLabels = [...labelsInUse].sort((a, b) => {
            const indexA = getIndexInOrder(a)
            const indexB = getIndexInOrder(b)
            return indexA - indexB
        }).map(label => label || '')
        const orderedGroups = sortedLabels.map(label => groups.find(group => group.name === label))
        return orderedGroups
    }

    async function onAddKanbanTask(statusName) {
        try {
            const newTask = boardService.getEmptyTask()
            newTask.status = statusName
            newTask.title = 'New task'
            await addTask(currBoard._id, currBoard.groups[0].id, newTask)
            showSuccessMsg(`Task added ${newTask.id}`)
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot add task')
        }
    }

    function toggleIsSearch() {
        if (filterBy.txt) return
        setIsSearch((prevIsSearch) => !prevIsSearch)
    }
    const dynSearchBtnInput = isSearch || filterBy.txt ?
        <SearchInput
            id="filter-search-input"
            className={"search-input " + (filterBy.txt ? 'searching' : '')}
            onBlur={() => toggleIsSearch()}
            value={filterBy.txt}
            onChange={(text) => setFilterBy({ ...filterBy, txt: text })}
            autoFocus
            debounceRate={200}
            iconName={Search}
            placeholder="Search"
            size="small"
            wrapperClassName="monday-storybook-search_size"
        /> :
        <Button
            onClick={() => toggleIsSearch()}
            leftIcon={Search}
            kind="tertiary"
            size="small">Search
        </Button>


    if (currBoard === null) return (
        <div className="monday-loader-container">
            <img src={MondayLoader} alt="" />
        </div>
    )

    return (
        <div className="kanban-details-container">
            <div className={"board-details-actions " + (!isCollapse ? 'collpase-actions-header' : '')} id="kanban-actions-container" >
                <SplitButton
                    shouldCloseOnClickInsideDialog
                    onClick={() => onAddKanbanTask('')}
                    size="small"
                    secondaryDialogContent={
                        <SplitButtonMenu _id="split-menu">
                            <MenuItem
                                onClick={() => console.log('clicked')}
                                icon={Group}
                                title="New group of items" />
                        </SplitButtonMenu>}>
                    New Task
                </SplitButton>

                {dynSearchBtnInput}

                <Button
                    leftIcon={Sort}
                    kind="tertiary"
                    size="small">
                    Sort
                </Button>

            </div>
            <div className="kanban-main-container">
                <KanbanGroupList
                    groups={groups}
                    labels={currBoard.labels}
                    currBoard={currBoard}
                    onAddKanbanTask={onAddKanbanTask}
                />
            </div>
        </div>
    )
}