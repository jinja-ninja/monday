import { useEffect, useState } from "react"
import { Button, IconButton, Loader, MenuItem, SplitButton, SplitButtonMenu, Search as SearchInput, Tooltip } from "monday-ui-react-core"
import { Add, Announcement, Check, Filter, Group, Hide, Menu, PersonRound, Search, Sort } from "monday-ui-react-core/icons"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { BoardMainHeader } from "../cmps/BoardMainHeader"
import { SideBar } from "../cmps/SideBar"
import { Outlet, useParams } from "react-router-dom"
import { addGroup, addTask, getBoardById, updateBoard } from "../store/actions/board.action"
import { useSelector } from "react-redux"
import { UserMsg } from "../cmps/UserMsg"
import MondayLoader from '../assets/Loader/MondayLoader.gif'
import { SelectedModal } from "../cmps/selectedModal"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { BoardDescriptionModal } from "../cmps/BoardDescriptionModal"

export function BoardDetails() {
    const params = useParams()
    const currBoard = useSelector(state => state.boardModule.board)
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const [isSearch, setIsSearch] = useState(false)
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const [sortBy, setSortBy] = useState(false)
    const [isBoardDesc, setIsBoardDesc] = useState(false)

    useEffect(() => {
        loadBoard()
    }, [params.boardId, filterBy])
    // [params.boardId, filterBy, sortBy]

    async function loadBoard() {
        await getBoardById(params.boardId, filterBy)
    }

    function toggleIsSearch() {
        setIsSearch((prevIsSearch) => !prevIsSearch)
    }

    async function addTaskToFirstGroup() {
        if (!currBoard.groups) return
        try {
            const newTask = boardService.getEmptyTask("New task")
            console.log('newTask:', newTask)
            await addTask(currBoard._id, currBoard.groups[0].id, newTask)
            showSuccessMsg('Added new task')
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    const cmpsOrder = [
        "side",
        "title",
        "MembersIds",
        "Status",
        "Priority",
        "dueDate",
        "Timeline",
        "Files",
    ]

    const dynSearchBtnInput = isSearch ?
        <SearchInput
            id="filter-search-input"
            className="search-input"
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

    const dynSortTitle = sortBy ? 'UnSort' : 'Sort'
    const progress = [null, null, "status", null, "priority", null]

    if (!currBoard) return <div className="monday-loader-container"><img src={MondayLoader} alt="" /></div>
    return <main className="board-details-layout">
        <BoardMainHeader />
        <SideBar />

        <section className="board-details-container">
            <UserMsg />

            <BoardDetailsHeader isStarred={currBoard.isStarred} title={currBoard.title} boardId={currBoard._id} setIsBoardDesc={setIsBoardDesc} />

            <div className="board-details-actions">

                <SplitButton shouldCloseOnClickInsideDialog onClick={() => addTaskToFirstGroup()} size="small" secondaryDialogContent={<SplitButtonMenu _id="split-menu">
                    <MenuItem onClick={() => addGroup(currBoard._id)} icon={Group} title="New group of items" />
                </SplitButtonMenu>}>
                    New Task
                </SplitButton>

                {dynSearchBtnInput}

                <Tooltip
                    content='Filter by person'
                    animationType="expand">
                    <Button leftIcon={PersonRound} kind="tertiary" size="small">Person</Button>
                </Tooltip>

                <SplitButton kind="tertiary" leftIcon={Filter} size="small" secondaryDialogContent={
                    <SplitButtonMenu _id="split-menu">
                        <MenuItem icon={Check} title="Hey" />
                        <MenuItem icon={Announcement} title="There" />
                    </SplitButtonMenu>}>
                    Filter
                </SplitButton>

                <Button onClick={() => setSortBy(!sortBy)} leftIcon={Sort} kind="tertiary" size="small">{dynSortTitle}</Button>

                <Tooltip
                    content='Hidden columns'
                    animationType="expand">
                    <Button leftIcon={Hide} kind="tertiary" size="small">Hide</Button>
                </Tooltip>

                <IconButton icon={Menu} size="small" />

            </div>
            <div className="spacing-div"></div>

            <GroupList
                boardId={params.boardId}
                groups={currBoard.groups}
                labels={currBoard.labels}
                cmpsOrder={cmpsOrder}
                progress={progress}
                priorities={currBoard.priorities}
            />

            <Outlet />

            {selectedTasks.length > 0 && < SelectedModal selectedTasks={selectedTasks} currBoard={currBoard} />}
            {isBoardDesc && <BoardDescriptionModal boardTitle={currBoard.title} setIsBoardDesc={setIsBoardDesc} />}

        </section>
    </main >
}