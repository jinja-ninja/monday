import { useDispatch, useSelector } from "react-redux"
import { useCallback, useRef, useState, useEffect } from "react"
import { MenuButton, Menu, MenuItem, Tooltip, Icon } from "monday-ui-react-core"

import { Checkbox, EditableHeading, Modal, ModalContent, ModalFooterButtons, ModalHeader } from "monday-ui-react-core"
import { DueDate } from "./dynamicCmps/DueDate"
import { Member } from "./dynamicCmps/Member"
import { Side } from "./dynamicCmps/Side"
import { TaskStatus } from "./dynamicCmps/TaskStatus"
import { Delete, Edit, Duplicate, Add } from "monday-ui-react-core/icons"

import { addTask, removeTask, updateTask, duplicatedTask, updateBoard } from "../store/actions/board.action"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { TaskTitle } from "./dynamicCmps/TaskTitle"
import { ADD_SELECTED_TASKS, REMOVE_SELECTED_TASKS, SET_SELECTED_TASKS } from "../store/reducers/board.reducer"
import { Timeline } from "./dynamicCmps/Timeline"
import { utilService } from "../services/util.service"
import { Files } from "./dynamicCmps/Files"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { DateSummary } from "./dynamicSummaryCmps/DateSummary"
import { TimelineSummary } from "./dynamicSummaryCmps/TimelineSummary"
import { StatusSummary } from "./dynamicSummaryCmps/StatusSummary"
import { PrioritySummary } from "./dynamicSummaryCmps/PrioritySummary"
import { MembersSummary } from "./dynamicSummaryCmps/MembersSummary"
import { DisplayTitle } from "./DisplayTitle"
import { FilesSummary } from "./dynamicSummaryCmps/FilesSummary"

export function TaskList({ group, cmpsOrder, priorities, setNumOfTasks, showGroup, isCollapse, collapseAll }) {
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const currBoard = useSelector(state => state.boardModule.board)

    const [isChecked, setIsChecked] = useState(false)
    const [addTaskInput, setAddTask] = useState('+ Add task ')
    const [show, setShow] = useState(false)
    const [taskId, setTaskId] = useState(null)
    const [isTypingNewTask, setIsTypingNewTask] = useState(false)

    const openModalButtonRef = useRef()
    const dispatch = useDispatch()
    const closeModal = useCallback(() => {
        setShow(false)
    }, [])

    const boardId = currBoard._id
    const groupId = group.id
    const labels = currBoard.labels
    const dynCollapseGroupClass = showGroup ? '' : 'collapse-group'

    let allTaskIds

    useEffect(() => {
        allTaskIds = getAllTasksIds()
        if (!allTaskIds.every(task => selectedTasks.some(selectedTask =>
            task.taskId === selectedTask.taskId && task.groupId === selectedTask.groupId))) {
            setIsChecked(false)
        }
        else {
            setIsChecked(true)
        }
        if (selectedTasks.length === 0 || allTaskIds.length == 0) setIsChecked(false)

    }, [selectedTasks])

    function selectAllTasks(e) {
        allTaskIds = getAllTasksIds()
        if (e.target.checked) {
            if (!selectedTasks) {
                dispatch({ type: SET_SELECTED_TASKS, selectedTasks: allTaskIds })
            } else {
                const filteredTaskIds = allTaskIds.filter(task => {
                    return !selectedTasks.some(selectedTask =>
                        selectedTask.taskId === task.taskId
                        && selectedTask.groupId === task.groupId)
                })
                dispatch({ type: ADD_SELECTED_TASKS, selectedTasks: filteredTaskIds })
            }
            setIsChecked(true)
        } else {
            dispatch({ type: REMOVE_SELECTED_TASKS, selectedTasks: allTaskIds })
            setIsChecked(false)
        }
    }

    function getAllTasksIds() {
        return group.tasks.map(task => ({
            groupId: group.id,
            taskId: task.id,
        }))
    }

    async function onRemoveTask(taskId) {
        try {
            await removeTask(boardId, groupId, taskId)
            setNumOfTasks(group.tasks.length - 1)
            showSuccessMsg(`Task removed ${taskId}`)
        } catch (err) {
            showErrorMsg(`Cannot remove task ${taskId}`)
        }
    }

    async function onAddTask(task) {
        try {
            const newTask = boardService.getEmptyTask()
            newTask.title = task
            await addTask(boardId, groupId, newTask)
            setNumOfTasks(group.tasks.length + 1)
            showSuccessMsg(`Task added ${newTask.id}`)
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    async function onUpdateTask(taskId, data = {}) {
        try {
            await updateTask(boardId, groupId, taskId, data)
            showSuccessMsg(`Task updated ${taskId}`)
        } catch (err) {
            showErrorMsg(`Cannot update task ${taskId}`)
            console.log('err:', err)
        }
    }

    async function onDuplicateTask(taskId) {
        try {
            await duplicatedTask(boardId, groupId, taskId)
            setNumOfTasks(group.tasks.length + 1)
            showSuccessMsg(`We successfully duplicated your task! ${taskId}`)
        } catch (err) {
            showErrorMsg(`Cannot duplicate task ${taskId}`)
        }
    }
    function onFinishTypingTask() {
        addTaskInput ? onAddTask(addTaskInput) : setAddTask('+ Add task ')
        setAddTask('+ Add task')
        setIsTypingNewTask(false)
    }

    function getPriorityOrStatusColor(title, kind) {
        return kind.find(k => k.title === title).color
    }

    function calculatePercentages(tasks, kind) {
        const propertyKey = kind === 'status' ? 'status' : 'priority'

        const propertyCounts = tasks.reduce((counts, task) => {
            const propertyValue = task[propertyKey]
            counts[propertyValue] = (counts[propertyValue] || 0) + 1
            return counts
        }, {})

        const totalTasks = tasks.length
        const propertyPercentages = []

        for (const propertyValue in propertyCounts) {
            const count = propertyCounts[propertyValue]
            const percentage = ((count / totalTasks) * 100).toFixed(1)
            propertyPercentages.push({ [propertyKey]: propertyValue, percentage, count })
        }

        return propertyPercentages
    }

    const handleRenameTask = (taskId) => {
        const taskElement = document.querySelector(`.task-title-container[data-task-id="${taskId}"]`)
        if (taskElement) {
            const editableElement = taskElement.querySelector('.editible-task-title div')
            if (editableElement) {
                editableElement.click()
            }
        }
    }

    function renderMenuButton(taskId) {
        return (
            <MenuButton size={MenuButton.sizes.XS} className='task-menu-btn'>
                <Menu id="menu" size="medium">
                    <MenuItem
                        icon={Delete}
                        iconType="SVG"
                        onClick={() => {
                            setShow(true)
                            setTaskId(taskId)
                        }
                        }
                        title="Delete" />
                    <MenuItem
                        icon={Edit}
                        iconType="SVG"
                        onClick={() => handleRenameTask(taskId)}
                        title="Rename task" />
                    <MenuItem
                        icon={Duplicate}
                        iconType="SVG"
                        onClick={() => onDuplicateTask(taskId)}
                        title="Duplicate" />
                </Menu>
            </MenuButton>
        )
    }

    function renderDynamicCmp(cmp, task, labels, priorities) {
        switch (cmp) {
            case "side":
                return <Side
                    info={group['style']}
                    taskId={task.id}
                    groupId={groupId} />
            case "title":
                return <TaskTitle info={task[cmp]}
                    boardId={boardId}
                    group={group}
                    groupId={groupId}
                    taskId={task.id}
                    onUpdateTask={onUpdateTask}
                    setIsTyping={setIsTypingNewTask}
                />
            case "status":
                return <TaskStatus
                    board={currBoard}
                    type={'status'}
                    task={task}
                    labels={labels}
                    onUpdateTask={onUpdateTask} />
            case "priority":
                return <TaskStatus
                    board={currBoard}
                    type={'priority'}
                    task={task}
                    labels={priorities}
                    onUpdateTask={onUpdateTask} />
            case "members":
                return <Member
                    boardMembers={currBoard.members}
                    task={task}
                    boardId={boardId}
                    groupId={groupId}
                />
            case "dueDate":
                return <DueDate
                    dueDate={task[cmp]}
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                    status={task.status}
                />
            case "timeline":
                return <Timeline
                    Timeline={task[cmp]}
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                    groupColor={group.style}
                />
            case "files":
                return <Files
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                    onUpdateTask={onUpdateTask}
                    taskFiles={task.files}
                    currBoard={currBoard}
                />
            default:
                break
        }
    }

    function getProgressOrder() {
        let progress = cmpsOrder.map((cmp) => {
            if (cmp === 'status' || cmp === 'priority' || cmp === 'dueDate' || cmp === 'timeline' || cmp === 'members' || cmp === 'files') return cmp
        })
        return progress.filter(item => item !== undefined)
    }

    function getDynGridTemplateCols() {
        let columsLength = getProgressOrder().length

        if (columsLength > 0) {
            return `38px 40px 480px repeat(${columsLength}, 140px) 1fr`
        } else {
            return '38px 40px 480px 1fr'
        }
    }

    function getDynGridTemplateColsSummary() {
        let columsLength = getProgressOrder().length

        if (columsLength > 0) {
            return `38px 520px repeat(${columsLength}, 140px) 1fr`
        } else {
            return '38px 520px 1fr'
        }
    }

    function getDynTaskColsLength() {
        let columsLength = getProgressOrder().length

        if (columsLength > 0) {
            return ['40px', '480px', ...Array(columsLength).fill('140px'), '1fr']
        } else {
            return ['40px', '480px', '1fr']
        }

    }

    return <div className={"task-list-container " + dynCollapseGroupClass}>

        <Droppable droppableId={'columns'} type="columns" direction="column">
            {(provided) => (
                <section
                    className={"header-title-container group-grid " + dynCollapseGroupClass + (!isCollapse ? ' collapse-header-title' : '')}
                    style={{ gridTemplateColumns: getDynGridTemplateCols() }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    <div className={"side-menu-btn-container " + (collapseAll ? 'dragging' : '')}></div>
                    {cmpsOrder.map((title, idx) => {
                        if (idx === 0) return (
                            <div className="header-title-side-wrapper" key={idx}>
                                <div className={"header-title-side " + dynCollapseGroupClass}>
                                    <div className="color-indicator"
                                        style={{
                                            backgroundColor: `var(--color-${group.style})`
                                        }}>
                                    </div>

                                    {showGroup &&
                                        <div className="task-select">
                                            <Checkbox
                                                checked={isChecked}
                                                onChange={(e) => selectAllTasks(e)}
                                                ariaLabel="Select task" />
                                        </div>}
                                </div>
                            </div>
                        )
                        if (title === 'title' && !showGroup) title = ''
                        return (
                            (title === 'title' || title === 'side') ?
                                <div className={"header-title " + dynCollapseGroupClass + (title === 'title' ? 'sticky-header-title' : '')}
                                    key={idx}>
                                    <DisplayTitle title={title} />
                                </div>
                                :
                                <Draggable
                                    key={idx}
                                    draggableId={`title-${idx}`}
                                    index={idx}
                                >
                                    {(provided) => (
                                        <div
                                            className={"header-title " + dynCollapseGroupClass + (idx === 1 ? ' sticky-header-title-collapse' : '')}
                                            key={idx}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <DisplayTitle title={title} />
                                        </div>
                                    )}
                                </Draggable>
                        )
                    })}
                    {provided.placeholder}
                    <div
                        className={"header-title last-col " + dynCollapseGroupClass}>
                        <Icon icon={Add} className="plus-icon" />
                    </div>
                </section>
            )}
        </Droppable>

        <Droppable droppableId={groupId}>
            {(provided) => (
                <div
                    className="task-list tasks-container"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {showGroup && group.tasks.map((task, index) => {
                        return (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(provided) => (
                                    <section className="task-list group-grid" key={task.id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <div className={"side-menu-btn-container " + (collapseAll ? 'dragging' : '')}>
                                            {renderMenuButton(task.id)}
                                        </div>
                                        {cmpsOrder.map((cmp, idx) =>
                                            <section className={"task-item " + (idx === 0 ? 'sticky-checkbox' : '') + (idx === 1 ? 'sticky-title' : '')}
                                                key={idx} style={{ width: getDynTaskColsLength()[idx] }}>
                                                {renderDynamicCmp(cmp, task, labels, priorities)}
                                            </section>
                                        )}
                                    </section>
                                )}
                            </Draggable>

                        )
                    })}
                    {provided.placeholder}
                </div>
            )}
        </Droppable >

        {showGroup && <section className={"task-list-add group-grid " + (isTypingNewTask ? 'typing' : '')} style={{ gridTemplateColumns: getDynGridTemplateCols() }}>

            <div className={"side-menu-btn-container " + (collapseAll ? 'dragging' : '')}></div>

            <div className="task-list-add-side">
                <div className="color-indicator"
                    style={{
                        backgroundColor: `var(--color-${group.style})`,
                    }}>
                </div>

                <div className="task-select">
                    <Checkbox disabled ariaLabel="Select task" />
                </div>
            </div>

            <EditableHeading
                className={"task-add-btn " + (isTypingNewTask ? 'typing' : '')}
                type={EditableHeading.types.h5}
                value={addTaskInput}
                onFinishEditing={() => {
                    onFinishTypingTask()
                }}
                onStartEditing={() => {
                    setAddTask('')
                    setIsTypingNewTask(true)
                }}
                onChange={(value) => setAddTask(value)} />

        </section>}


        <section className={"task-list-summary-wrapper group-grid " + dynCollapseGroupClass}
            style={{ gridTemplateColumns: getDynGridTemplateColsSummary() }}>

            <div className={"side-menu-btn-container " + (collapseAll ? 'dragging' : '')}></div>

            <div className={"task-list-summary-emptycell-left " + dynCollapseGroupClass}>
                {!showGroup && <div className="color-indicator"
                    style={{
                        backgroundColor: `var(--color-${group.style})`,
                    }}>
                </div>}
                <div className="summary-scroll-hide-div"></div>
            </div>


            {/* + (isCollapse ? ' collapse-header' : '') */}
            {getProgressOrder().map((cmp, idx) => (
                <div className={`task-list-summary ${idx === 0 ? "first-cell " : ""} ${dynCollapseGroupClass}`} key={idx}>
                    {cmp === "status" &&
                        <StatusSummary
                            group={group}
                            labels={labels}
                            calculatePercentages={calculatePercentages}
                            getPriorityOrStatusColor={getPriorityOrStatusColor} />
                    }
                    {cmp === "priority" && <PrioritySummary
                        group={group}
                        priorities={priorities}
                        calculatePercentages={calculatePercentages}
                        getPriorityOrStatusColor={getPriorityOrStatusColor}
                    />
                    }
                    {cmp === "dueDate" && <DateSummary group={group} />}
                    {cmp === "timeline" && <TimelineSummary group={group} />}
                    {cmp === "members" && <MembersSummary group={group} currBoard={currBoard} />}
                    {cmp === "files" && <FilesSummary group={group}/>}
                </div>
            ))}

            <div className={"task-list-summary last-col " + dynCollapseGroupClass}> </div>

        </section >

        <>
            <Modal
                id="story-book-modal"
                title="Modal title"
                triggerElement={openModalButtonRef.current}
                show={show}
                onClose={closeModal} // Width prop effects on the modal width
                width={Modal.width.DEFAULT} contentSpacing>
                <ModalHeader title={"Delete"} iconSize={32} />
                <ModalContent>Delete this item? </ModalContent>
                <ModalFooterButtons
                    primaryButtonText="Delete"
                    secondaryButtonText="Cancel"
                    onPrimaryButtonClick={() => {
                        onRemoveTask(taskId)
                        closeModal()
                    }
                    } onSecondaryButtonClick={closeModal} />
            </Modal>
        </>

    </div >

}