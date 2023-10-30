import { useEffect, useState } from "react"
import { Button, IconButton, MenuItem, SplitButton, SplitButtonMenu, Search as SearchInput, Tooltip, Avatar, useClickOutside, } from "monday-ui-react-core"
import { Announcement, Check, Filter, Group, Menu, Search, Sort } from "monday-ui-react-core/icons"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { BoardMainHeader } from "../cmps/BoardMainHeader"
import { SideBar } from "../cmps/SideBar"
import { Outlet, useParams } from "react-router-dom"
import { addGroup, addTask, getBoardById, loadBoard, updateBoardOptimistic } from "../store/actions/board.action"
import { useSelector } from "react-redux"
import { UserMsg } from "../cmps/UserMsg"
import MondayLoader from '../assets/Loader/MondayLoader.gif'
import { SelectedModal } from "../cmps/selectedModal"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { BoardDescriptionModal } from "../cmps/BoardDescriptionModal"
import { DragDropContext } from "react-beautiful-dnd"
import { NoGroupsFound } from "../cmps/NoGroupsFound";
import { utilService } from "../services/util.service";
import { BoardDeletedPage } from "../cmps/BoardDeletedPage";
import { HideBtn } from "../cmps/HideBtn";
import { PersonBtn } from "../cmps/PersonBtn";
import { useDispatch } from "react-redux"
import { SET_COLUMNS_STATE } from "../store/reducers/board.reducer"
import { BoardActionsBtns } from "../cmps/BoardActionsBtns"
import { KanbanDetails } from "../cmps/Kanban/KanbanDetails"
import { DashboardDetails } from "../cmps/Dashboard/DashboardDetails"

export function BoardDetails() {
    const params = useParams()
    const dispatch = useDispatch()
    const currBoard = useSelector(state => state.boardModule.board)
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const columnsState = useSelector(state => state.boardModule.columnsState)
    const [content, setContent] = useState('board')

    const [isSearch, setIsSearch] = useState(false)
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const [sortBy, setSortBy] = useState(false)
    const [isBoardDesc, setIsBoardDesc] = useState(false)
    const [personPickerOpen, setPersonPickerOpen] = useState(false)
    const [hidePickerOpen, setHidePickerOpen] = useState(false)

    let hiddenColumns = getAllUnCheckedColumns()

    function getAllUnCheckedColumns() {
        return columnsState.filter(column => !column.isChecked).map(uncheckedColumn => uncheckedColumn.name)
    }


    useEffect(() => {
        loadBoard(params.boardId, filterBy, sortBy)
    }, [params.boardId, filterBy, sortBy])

    useEffect(() => {
        // if moving to another board reset the hidden columns to none
        dispatch({
            type: SET_COLUMNS_STATE, columnsState: [
                { name: "Members", isChecked: true },
                { name: "Status", isChecked: true },
                { name: "Priority", isChecked: true },
                { name: "DueDate", isChecked: true },
                { name: "Timeline", isChecked: true },
                { name: "Files", isChecked: true }
            ]
        })

    }, [params.boardId])

    // async function loadBoard() {
    //     await getBoardById(params.boardId, filterBy, sortBy)
    // }

    function toggleIsSearch() {
        if (filterBy.txt) return
        setIsSearch((prevIsSearch) => !prevIsSearch)
    }

    function onTogglePersonModal(ev) {
        setPersonPickerOpen(prev => !prev)
    }
    function onToggleHideColumnsModal(ev) {
        setHidePickerOpen(prev => !prev)
    }

    async function addTaskToFirstGroup() {
        if (!currBoard.groups) return
        try {
            const newTask = boardService.getEmptyTask("New task")
            await addTask(currBoard._id, currBoard.groups[0].id, newTask, true)
            showSuccessMsg('Added new task')
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    function onRemovePersonFilter(ev) {
        ev.stopPropagation()
        setFilterBy((prevFilterBy) => ({
            ...prevFilterBy,
            person: null,
        }))
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

    async function onDragEnd(result) {
        const { destination, source, draggableId, type } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (type === 'groups') {
            const newGroups = [...currBoard.groups]
            const [removed] = newGroups.splice(source.index, 1)
            newGroups.splice(destination.index, 0, removed)
            const newBoard = { ...currBoard, groups: newGroups }
            await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'groups', value: newGroups }, newBoard)
            return
        }

        if (type === 'columns') {
            const newCmpsOrder = [...currBoard.cmpsOrder]
            const [removed] = newCmpsOrder.splice(source.index, 1)
            newCmpsOrder.splice(destination.index, 0, removed)
            const newBoard = { ...currBoard, cmpsOrder: newCmpsOrder }
            await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'cmpsOrder', value: newCmpsOrder }, newBoard)
            return
        }

        const start = currBoard.groups.find(group => group.id === source.droppableId)
        const finish = currBoard.groups.find(group => group.id === destination.droppableId)

        if (start === finish) {
            const newTasks = [...start.tasks]
            const [removed] = newTasks.splice(source.index, 1)
            newTasks.splice(destination.index, 0, removed)
            const newGroups = currBoard.groups.map(group => {
                if (group.id === start.id) return { ...group, tasks: newTasks }
                return group
            })
            const newBoard = { ...currBoard, groups: newGroups }
            await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'groups', value: newGroups }, newBoard)
            return
        }
        const startTasks = [...start.tasks]
        startTasks.splice(source.index, 1)
        const newStart = { ...start, tasks: startTasks }
        const task = start.tasks.find(task => task.id === draggableId)
        const finishTasks = [...finish.tasks]
        finishTasks.splice(destination.index, 0, task)
        const newFinish = { ...finish, tasks: finishTasks }
        const newGroups = currBoard.groups.map(group => {
            if (group.id === start.id) return newStart
            if (group.id === finish.id) return newFinish
            return group
        })
        const newBoard = { ...currBoard, groups: newGroups }
        await updateBoardOptimistic('board', currBoard._id, null, null, { key: 'groups', value: newGroups }, newBoard)
    }


    if (currBoard === null) return <div className="monday-loader-container"><img src={MondayLoader} alt="" /></div>
    return <main className="board-details-layout">
        <BoardMainHeader />
        <SideBar />

        <section className="board-details-container">
            <UserMsg />

            {typeof currBoard === 'string' && <BoardDeletedPage boardTitle={currBoard} />}
            {typeof currBoard !== 'string' &&
                <>
                    <BoardDetailsHeader
                        setContent={setContent}
                        isStarred={currBoard.isStarred}
                        title={currBoard.title}
                        boardId={currBoard._id}
                        setIsBoardDesc={setIsBoardDesc}
                    />

                    {content === 'board' &&
                        <>
                            <BoardActionsBtns
                                currBoard={currBoard}
                                addTaskToFirstGroup={addTaskToFirstGroup}
                                addGroup={addGroup}
                                setPersonPickerOpen={setPersonPickerOpen}
                                onTogglePersonModal={onTogglePersonModal}
                                onRemovePersonFilter={onRemovePersonFilter}
                                personPickerOpen={personPickerOpen}
                                dynSearchBtnInput={dynSearchBtnInput}
                                setFilterBy={setFilterBy}
                                filterBy={filterBy}
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                                hidePickerOpen={hidePickerOpen}
                                onToggleHideColumnsModal={onToggleHideColumnsModal}
                                hiddenColumns={hiddenColumns}
                            />

                            <div className="spacing-div"></div>
                            <DragDropContext onDragEnd={onDragEnd} >
                                <GroupList
                                    boardId={params.boardId}
                                    groups={currBoard.groups}
                                    labels={currBoard.labels}
                                    cmpsOrder={currBoard.cmpsOrder}
                                    priorities={currBoard.priorities}
                                    hiddenColumns={hiddenColumns}
                                />
                            </DragDropContext>
                        </>
                    }

                    {content === 'kanban' && <KanbanDetails />}
                    {content === 'dashboard' && <DashboardDetails/>}

                    {currBoard.groups.length === 0 && <NoGroupsFound cmpsOrder={currBoard.cmpsOrder} />}

                    <Outlet />
                </>
            }

            {selectedTasks.length > 0 && < SelectedModal selectedTasks={selectedTasks} currBoard={currBoard} />}
            {isBoardDesc && <BoardDescriptionModal boardTitle={currBoard.title} setIsBoardDesc={setIsBoardDesc} />}

        </section>
    </main >
}
