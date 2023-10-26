import { useCallback, useEffect, useRef, useState } from "react"
import { usePopper } from "react-popper";
import { Button, IconButton, Loader, MenuItem, SplitButton, SplitButtonMenu, Search as SearchInput, Tooltip, Avatar, Icon, useClickOutside } from "monday-ui-react-core"
import { Add, Announcement, Check, CloseSmall, Filter, Group, Hide, Menu, PersonRound, Search, Sort } from "monday-ui-react-core/icons"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { BoardMainHeader } from "../cmps/BoardMainHeader"
import { SideBar } from "../cmps/SideBar"
import { Outlet, useParams } from "react-router-dom"
import { addGroup, addTask, getBoardById, updateBoard, updateBoardOptimistic } from "../store/actions/board.action"
import { useSelector } from "react-redux"
import { UserMsg } from "../cmps/UserMsg"
import MondayLoader from '../assets/Loader/MondayLoader.gif'
import { SelectedModal } from "../cmps/selectedModal"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { BoardDescriptionModal } from "../cmps/BoardDescriptionModal"
import { PersonPickerModal } from "../cmps/personPickerModal";
import { DragDropContext } from "react-beautiful-dnd"
import { NoGroupsFound } from "../cmps/NoGroupsFound";

export function BoardDetails() {
    const params = useParams()
    const currBoard = useSelector(state => state.boardModule.board)
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)

    const [isSearch, setIsSearch] = useState(false)
    const [filterBy, setFilterBy] = useState({ txt: '', person: null })
    const [sortBy, setSortBy] = useState(false)
    const [isBoardDesc, setIsBoardDesc] = useState(false)
    const [personPickerOpen, setPersonPickerOpen] = useState(false)

    const [referenceElement, setReferenceElement] = useState(null)
    const [popperElement, setPopperElement] = useState(null)
    const [arrowElement, setArrowElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
    })

    const refPersonModal = useRef(null)

    useEffect(() => {
        loadBoard()
    }, [params.boardId, filterBy])

    const onClickOutsidePersonModal = useCallback(() => {
        setPersonPickerOpen(false)
    }, [])

    useClickOutside({
        ref: refPersonModal,
        callback: onClickOutsidePersonModal
    })

    async function loadBoard() {
        await getBoardById(params.boardId, filterBy)
    }

    function toggleIsSearch() {
        if (filterBy.txt) return
        setIsSearch((prevIsSearch) => !prevIsSearch)
    }

    function onTogglePersonModal(ev) {
        if (ev.target.closest('.person-picker-container')) return
        ev.stopPropagation()
        setPersonPickerOpen(prev => !prev)
    }

    async function addTaskToFirstGroup() {
        if (!currBoard.groups) return
        try {
            const newTask = boardService.getEmptyTask("New task")
            await addTask(currBoard._id, currBoard.groups[0].id, newTask)
            showSuccessMsg('Added new task')
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    function getNameInitials(fullname) {
        const names = fullname.split(' ')
        return names.map(name => name[0]).join('')
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
                    <div className="person-filter-btns-container" ref={setReferenceElement}>
                        {!filterBy.person ?
                            <Button leftIcon={PersonRound} kind="tertiary" size="small" onClick={(ev) => onTogglePersonModal(ev)}>
                                Person
                            </Button> :
                            <div className="chosen-person-filter-btn" onClick={(ev) => onTogglePersonModal(ev)}>
                                <div className="person-img-txt-container">
                                    {(!filterBy.person.imgUrl || filterBy.person.imgUrl === 'https://www.google.com') ? (
                                        <Avatar
                                            className='avatar-img'
                                            size={Avatar.sizes.SMALL}
                                            type={Avatar.types.TEXT}
                                            text={getNameInitials(filterBy.person.fullname)}
                                            backgroundColor={Avatar.colors.BLACKISH}
                                            ariaLabel={filterBy.person.fullname}
                                        />
                                    ) : (
                                        <Avatar
                                            className='avatar-img'
                                            ariaLabel={filterBy.person.fullname}
                                            size={Avatar.sizes.SMALL}
                                            src={filterBy.person.imgUrl}
                                            type="img"
                                        />
                                    )}
                                    <span>Person</span>
                                </div>
                                <div className="btn-remove-person" onClick={(ev) => onRemovePersonFilter(ev)}>
                                    <svg viewBox="0 0 20 20" fill="currentColor" width="16px" height="16px" id="combobox-search" aria-hidden="true" aria-label="Clear Search" class="icon_component input-component__icon icon_component--no-focus-style"><path d="M6.53033 5.46967C6.23744 5.17678 5.76256 5.17678 5.46967 5.46967C5.17678 5.76256 5.17678 6.23744 5.46967 6.53033L8.62562 9.68628L5.47045 12.8415C5.17756 13.1343 5.17756 13.6092 5.47045 13.9021C5.76334 14.195 6.23822 14.195 6.53111 13.9021L9.68628 10.7469L12.8415 13.9021C13.1343 14.195 13.6092 14.195 13.9021 13.9021C14.195 13.6092 14.195 13.1343 13.9021 12.8415L10.7469 9.68628L13.9029 6.53033C14.1958 6.23744 14.1958 5.76256 13.9029 5.46967C13.61 5.17678 13.1351 5.17678 12.8422 5.46967L9.68628 8.62562L6.53033 5.46967Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                </div>


                            </div>
                        }
                    </div>

                </Tooltip>

                {personPickerOpen && <div className="person-picker-modal" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
                    <div className="click-outside-container" ref={refPersonModal}>
                        <PersonPickerModal Members={currBoard.members} setFilterBy={setFilterBy} filterBy={filterBy}
                            getNameInitials={getNameInitials} />
                    </div>
                    <div ref={setArrowElement} style={styles.arrow} />
                </div>}

                <SplitButton kind="tertiary" leftIcon={Filter} size="small" secondaryDialogContent={
                    <SplitButtonMenu _id="split-menu">
                        <MenuItem icon={Check} title="Hey" />
                        <MenuItem icon={Announcement} title="There" />
                    </SplitButtonMenu>}>
                    Filter
                </SplitButton>

                <Button onClick={() => setSortBy(!sortBy)} leftIcon={Sort} kind="tertiary" size="small">Sort</Button>

                <Tooltip
                    content='Hidden columns'
                    animationType="expand">
                    <Button leftIcon={Hide} kind="tertiary" size="small">Hide</Button>
                </Tooltip>

                <IconButton icon={Menu} size="small" />
            </div>


            <div className="spacing-div"></div>
            <DragDropContext onDragEnd={onDragEnd} >
                <GroupList
                    boardId={params.boardId}
                    groups={currBoard.groups}
                    labels={currBoard.labels}
                    cmpsOrder={currBoard.cmpsOrder}
                    priorities={currBoard.priorities}
                />
            </DragDropContext>

            {currBoard.groups.length === 0 && <NoGroupsFound cmpsOrder={cmpsOrder} />}

            <Outlet />

            {selectedTasks.length > 0 && < SelectedModal selectedTasks={selectedTasks} currBoard={currBoard} />}
            {isBoardDesc && <BoardDescriptionModal boardTitle={currBoard.title} setIsBoardDesc={setIsBoardDesc} />}

        </section>
    </main >
}