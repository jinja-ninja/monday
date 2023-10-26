import { useDispatch, useSelector } from "react-redux"
import { useCallback, useRef, useState, useEffect } from "react"
import { MenuButton, Menu, MenuItem, Tooltip } from "monday-ui-react-core"

import { Checkbox, EditableHeading, Modal, ModalContent, ModalFooterButtons, ModalHeader } from "monday-ui-react-core"
import { Date } from "./dynamicCmps/Date"
import { Member } from "./dynamicCmps/Member"
import { TaskPriority } from "./dynamicCmps/TaskPriority"
import { Side } from "./dynamicCmps/Side"
import { TaskStatus } from "./dynamicCmps/TaskStatus"
import { Delete, Edit, Duplicate } from "monday-ui-react-core/icons"

import { addTask, removeTask, updateTask, duplicatedTask } from "../store/actions/board.action"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

import { TaskTitle } from "./dynamicCmps/TaskTitle"
import { ADD_SELECTED_TASKS, REMOVE_SELECTED_TASKS, SET_SELECTED_TASKS } from "../store/reducers/board.reducer"
import { Timeline } from "./dynamicCmps/Timeline"

export function TaskList({ group, cmpsOrder, labels, priorities, setNumOfTasks }) {
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const currBoard = useSelector(state => state.boardModule.board)

    const [isChecked, setIsChecked] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [addTaskInput, setAddTask] = useState('+ Add task ')
    const [show, setShow] = useState(false)
    const [taskId, setTaskId] = useState(null)
    const [loading, setLoading] = useState(false)
    const openModalButtonRef = useRef()
    const dispatch = useDispatch()
    const closeModal = useCallback(() => {
        setShow(false)
    }, [])

    const boardId = currBoard._id
    const groupId = group.id
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
                    return !selectedTasks.some(selectedTask => selectedTask.taskId === task.taskId && selectedTask.groupId === task.groupId)
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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
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

    function getPriorityOrStatusColor(title, kind) {
        return kind.find(k => k.title === title).color
    }



    function calculatePercentages(tasks, kind) {
        const propertyKey = kind === 'status' ? 'status' : 'priority'

        const propertyCounts = tasks.reduce((counts, task) => {
            const propertyValue = task[propertyKey]
            counts[propertyValue] = (counts[propertyValue] || 0) + 1
            return counts
        }, {});

        const totalTasks = tasks.length
        const propertyPercentages = []

        for (const propertyValue in propertyCounts) {
            const count = propertyCounts[propertyValue]
            const percentage = ((count / totalTasks) * 100).toFixed(1)
            propertyPercentages.push({ [propertyKey]: propertyValue, percentage, count })
        }

        return propertyPercentages
    }

    function renderMenuButton(taskId) {
        return (
            <MenuButton size={MenuButton.sizes.XS}
                className={`task-menu-btn `}
                onClick={toggleMenu}>

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
                        onClick={() => handleEditClick(group.id)}
                        title="Rename Task" />
                    <MenuItem
                        icon={Duplicate}
                        iconType="SVG"
                        onClick={() => onDuplicateTask(taskId)}
                        title="Duplicate this Task" />
                </Menu>

            </MenuButton>
        )
    }

    function renderDynamicCmp(cmp, task, labels, priorities) {
        // console.log('task[cmp]:', task[cmp])
        switch (cmp) {
            case "side":
                return <Side info={group['style']} taskId={task.id} groupId={groupId} />
            case "title":
                return <TaskTitle info={task[cmp]}
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                    onUpdateTask={onUpdateTask} />
            case "Status":
                return <TaskStatus
                    type={'status'}
                    task={task}
                    labels={labels}
                    onUpdateTask={onUpdateTask} />
            case "Priority":
                return <TaskStatus
                    type={'priority'}
                    task={task}
                    labels={priorities}
                    onUpdateTask={onUpdateTask} />
            case "Members":
                return <Member
                    boardMembers={currBoard.members}
                    task={task}
                    boardId={boardId}
                    groupId={groupId}
                />
            case "dueDate":
                return <Date
                    dueDate={task[cmp]}
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                />
            case "Timeline":
                return <Timeline
                    // Timeline={task[cmp]}
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                />
            default:
                break
        }
    }
    return <div className="task-list-container">

        <section className="header-title-container group-grid">
            {cmpsOrder.map((title, idx) => {
                if (idx === 0) return <div className="header-title-side-wrapper" key={idx}>
                    <div className="header-title-side">
                        <div className="color-indicator"
                            style={{
                                backgroundColor: `var(--color-${group.style})`
                            }}>
                        </div>

                        <div className="task-select">
                            <Checkbox checked={isChecked} onChange={(e) => selectAllTasks(e)} ariaLabel="Select task" />
                        </div>
                    </div>
                </div>
                return <div className="header-title" key={idx}>{title}</div>
            }
            )}
        </section>

        {group.tasks.map(task => {
            return (<section className="task-list group-grid" key={task.id}>
                {renderMenuButton(task.id)}
                {
                    cmpsOrder.map((cmp, idx) =>
                        <section className="task-item" key={idx}>
                            {renderDynamicCmp(cmp, task, labels, priorities)}
                        </section>
                    )
                }
            </section >
            )
        })}

        <section className="task-list-add group-grid">

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
                className="task-add-btn"
                type={EditableHeading.types.h5}
                value={addTaskInput}
                onBlur={() => {
                    addTaskInput ? onAddTask(addTaskInput) : setAddTask('+ Add task ')
                    setAddTask('+ Add task')
                }}
                onStartEditing={() => setAddTask('')}
                onChange={(value) => setAddTask(value)} />

        </section>

        <section className="task-list-summary-wrapper group-grid">
            <div className="task-list-summary-emptycell-left"></div>
            <div className="task-list-summary">
                {calculatePercentages(group.tasks, 'status').map((status, index) => (
                    <Tooltip
                        key={index}
                        content={`${status.status} ${status.count}/${group.tasks.length} ${status.percentage}% `}
                        animationType="expand">

                        <div
                            className="label-progress-item"
                            style={{
                                width: `${status.percentage}%`,
                                backgroundColor: `var(--color-${getPriorityOrStatusColor(status.status, labels)})`,
                                height: '24px',
                            }}
                        >
                        </div>
                    </Tooltip>
                ))}
                {group.tasks.length === 0 && <div className="status-sum-container"></div>}
            </div>

            <div className="task-list-summary">
                {calculatePercentages(group.tasks, 'priority').map((priority, index) => (
                    <Tooltip
                        key={index}
                        content={`${priority.priority} ${priority.count}/${group.tasks.length} ${priority.percentage}% `}
                        animationType="expand">
                        <div
                            className="label-progress-item"
                            style={{
                                width: `${priority.percentage}%`,
                                backgroundColor: `var(--color-${getPriorityOrStatusColor(priority.priority, priorities)})`,
                                height: '24px',
                            }}
                        >
                        </div>
                    </Tooltip>

                ))}
                {group.tasks.length === 0 && <div className="status-sum-container"></div>}
            </div>
        </section>

        <>
            <Modal id="story-book-modal" title="Modal title" triggerElement={openModalButtonRef.current} show={show} onClose={closeModal} // Width prop effects on the modal width
                width={Modal.width.DEFAULT} contentSpacing>
                <ModalHeader title={"Delete"} iconSize={32} />
                <ModalContent>Delete this item? </ModalContent>
                <ModalFooterButtons primaryButtonText="Delete" secondaryButtonText="Cancel" onPrimaryButtonClick={() => {
                    onRemoveTask(taskId)
                    closeModal()
                }
                } onSecondaryButtonClick={closeModal} />
            </Modal>
        </>

    </div >

}