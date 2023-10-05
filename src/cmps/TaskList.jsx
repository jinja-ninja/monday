import { Checkbox, EditableHeading } from "monday-ui-react-core"
import { Date } from "./dynamicCmps/Date"
import { Member } from "./dynamicCmps/Member"
import { Priority } from "./dynamicCmps/Priority"
import { Side } from "./dynamicCmps/Side"
import { Status } from "./dynamicCmps/Status"
import { TaskTitle } from "./dynamicCmps/TaskTitle"
import { boardService } from "../services/board.service.local"
import { useSelector } from "react-redux"
import { addTask, removeTask, updateTask, duplicatedTask } from "../store/actions/board.action"
import { useState } from "react"
import { IconButton, MenuButton, Menu, MenuTitle, MenuItem } from "monday-ui-react-core"
import { Add, Delete, DropdownChevronDown, DropdownChevronRight, Edit, Duplicate } from "monday-ui-react-core/icons"


export function TaskList({ group, cmpOrder }) {

    const currBoard = useSelector(state => state.boardModule.board)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [addTaskInput, setAddTask] = useState('+ Add Item')

    const boardId = currBoard._id
    const groupId = group.id

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    };

    async function onRemoveTask(taskId) {
        try {
            await removeTask(boardId, groupId, taskId)
            // showSuccessMsg('Task removed')
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    async function onAddTask(task) {
        try {
            const newTask = boardService.getEmptyTask()
            newTask.title = task
            await addTask(boardId, groupId, newTask)
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    async function onUpdateTask(taskId, data = {}) {
        try {
            await updateTask(boardId, groupId, taskId, data)
            // showSuccessMsg('Task removed')
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    async function onDuplicateTask(taskId) {

        try {
            await duplicatedTask(boardId, groupId, taskId)
            // showSuccessMsg('Task removed')
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    return <div className="task-list-container">

        <section className="header-title-container group-grid">
            {cmpOrder.map((title, idx) => (
                <div className="header-title" key={idx}>{title}</div>
            ))
            }
        </section>

        {group.tasks.map(task => {
            const taskId = task.id
            return (<section className="task-list group-grid" key={task.id}>

                <MenuButton
                    size={MenuButton.sizes.XS}
                    className={`task-menu-btn `}
                    onClick={toggleMenu}
                >
                    <Menu
                        id="menu"
                        size="medium"

                    >
                        <MenuItem
                            icon={Delete}
                            iconType="SVG"
                            onClick={() => onRemoveTask(task.id)}
                            title="Delete"
                        />
                        <MenuItem
                            icon={Edit}
                            iconType="SVG"
                            onClick={() => handleEditClick(group.id)}
                            title="Rename Task"
                        />
                        <MenuItem
                            icon={Duplicate}
                            iconType="SVG"
                            onClick={() => onDuplicateTask(task.id)}
                            title="Duplicate this Task"
                        />
                    </Menu>
                </MenuButton>
                {/* <button button onClick={() => onRemove(boardId, groupId, taskId)}>X {task.title}</button> */}
                {cmpOrder.map((cmp, idx) =>
                    < section section className="task-item" key={idx} >
                        <DynamicCmp cmpType={cmp}
                            info={task[cmp]}
                            taskId={task.id}
                            boardId={boardId}
                            groupId={groupId}
                            onUpdateTask={onUpdateTask} />
                    </section>
                )}
            </section>
            )
        })}

        <section className="task-list-add group-grid">
            <div className="task-list-add-side">
                <Checkbox disabled />
            </div>
            <EditableHeading className="task-add-btn"
                type={EditableHeading.types.h5}
                value={addTaskInput}
                onBlur={() => {
                    addTaskInput ? onAddTask(addTaskInput) : setAddTask('+ Add Item')
                    setAddTask('+ Add Item')
                }}
                onStartEditing={() => setAddTask('')}
                onChange={(value) => setAddTask(value)} />
        </section>

        <section className="task-list-summary-wrapper group-grid">
            <div className="task-list-summary-emptycell-left"></div>
            <div className="task-list-summary">StatusSum</div>
        </section>

    </div >
}

const DynamicCmp = ({ cmpType, info, boardId, groupId, taskId, onUpdateTask }) => {

    switch (cmpType) {
        case "side":
            return <Side info={info} />
        case "priority":
            return <Priority info={info} />
        case "title":
            return <TaskTitle info={info}
                boardId={boardId}
                groupId={groupId}
                taskId={taskId}
                onUpdateTask={onUpdateTask} />
        case "status":
            return <Status info={info} />
        case "memberIds":
            return <Member info={info} />
        case "dueDate":
            return <Date info={info} />

        default:
            break
    }
}