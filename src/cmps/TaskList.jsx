import { useDispatch, useSelector } from "react-redux"
import { useCallback, useRef, useState, useEffect } from "react"
import { MenuButton, Menu, MenuItem } from "monday-ui-react-core"

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

export function TaskList({ group, cmpsOrder, labels, priorities }) {
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const currBoard = useSelector(state => state.boardModule.board)

    const [isChecked, setIsChecked] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [addTaskInput, setAddTask] = useState('+ Add Item ')
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

    useEffect(() => {
        if (selectedTasks.length === 0) setIsChecked(false)
    }, [selectedTasks])

    function selectAllTasks(e) {
        const allTaskIds = getAllTasksIds()
        console.log('allTaskIds:', allTaskIds)
        if (e.target.checked) {
            if (!selectedTasks) {
                dispatch({ type: SET_SELECTED_TASKS, selectedTasks: allTaskIds })
            } else {
                dispatch({ type: ADD_SELECTED_TASKS, selectedTasks: allTaskIds })
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
        } catch (err) {
            showErrorMsg('Cannot add task')
        }
    }

    async function onUpdateTask(taskId, data = {}) {
        try {
            await updateTask(boardId, groupId, taskId, data)
            showSuccessMsg(`Task updated ${taskId}`)
        } catch (err) {
            showErrorMsg(`Cannot remove task ${taskId}`)
        }
    }

    async function onDuplicateTask(taskId) {

        try {
            await duplicatedTask(boardId, groupId, taskId)
            showSuccessMsg(`We successfully duplicated your task! ${taskId}`)
        } catch (err) {
            showErrorMsg(`Cannot duplicate task ${taskId}`)
        }
    }

    function renderMenuButton(taskId) {
        // console.log('taskId:', taskId)
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
        switch (cmp) {
            case "side":
                return <Side info={group['style']} taskId={task.id} groupId={groupId} />
            case "title":
                return <TaskTitle info={task[cmp]}
                    boardId={boardId}
                    groupId={groupId}
                    taskId={task.id}
                    onUpdateTask={onUpdateTask} />
            case "status":
                return <TaskStatus
                    type={'status'}
                    task={task}
                    labels={labels}
                    onUpdateTask={onUpdateTask} />
            case "priority":
                return <TaskStatus
                    type={'priority'}
                    task={task}
                    labels={priorities}
                    onUpdateTask={onUpdateTask} />
            case "memberIds":
                return <Member info={task[cmp]} />
            case "dueDate":
                return <Date info={task[cmp]} />

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
                        backgroundColor: `var(--color-${group.style})`
                    }}>
                </div>

                <div className="task-select">
                    <Checkbox disabled ariaLabel="Select task" />
                </div>
            </div>

            <EditableHeading className="task-add-btn"
                type={EditableHeading.types.h5}
                value={addTaskInput}
                onBlur={() => {
                    addTaskInput ? onAddTask(addTaskInput) : setAddTask('+ Add Item ')
                    setAddTask('+ Add Item')
                }}
                onStartEditing={() => setAddTask('')}
                onChange={(value) => setAddTask(value)} />

        </section>

        <section className="task-list-summary-wrapper group-grid">
            <div className="task-list-summary-emptycell-left"></div>
            <div className="task-list-summary">StatusSum</div>
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