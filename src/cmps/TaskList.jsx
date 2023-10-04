import { Checkbox, EditableHeading } from "monday-ui-react-core";
import { Date } from "./dynamicCmps/Date";
import { Member } from "./dynamicCmps/Member";
import { Priority } from "./dynamicCmps/Priority";
import { Side } from "./dynamicCmps/Side";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";
import { boardService } from "../services/board.service.local";
import { useSelector } from "react-redux";
import { addTask, removeTask, updateTask } from "../store/actions/board.action";
import { useState } from "react";

export function TaskList({ group, cmpOrder }) {

    const currBoard = useSelector(state => state.boardModule.board)
    const [addTaskInput, setAddTask] = useState('+ Add Item')

    const boardId = currBoard._id
    const groupId = group.id

    async function onRemove(taskId) {
        try {
            await removeTask(boardId, groupId, taskId)
            // showSuccessMsg('Task removed')
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    async function onAdd(task) {
        try {
            const newTask = boardService.getEmptyTask()
            newTask.title = task
            await addTask(boardId, groupId, newTask)
            // showSuccessMsg('Task removed')
        } catch (err) {
            // showErrorMsg('Cannot remove task')
        }
    }

    async function onUpdate(taskId, data = {}) {
        try {
            await updateTask(boardId, groupId, taskId, data)
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
            return <section className="task-list group-grid" key={task.id}>
                {/* <button button onClick={() => onRemove(boardId, groupId, taskId)}>X {task.title}</button> */}
                {cmpOrder.map((cmp, idx) =>
                    < section section className="task-item" key={idx} >
                        <DynamicCmp cmpType={cmp}
                            info={task[cmp]}
                            taskId={taskId}
                            boardId={boardId}
                            groupId={groupId}
                            onUpdate={onUpdate} />
                    </section>
                )}
            </section>
        })}

        <section className="task-list-add group-grid">
            <div className="task-list-add-side">
                <Checkbox disabled />
            </div>
            <EditableHeading className="task-add-btn"
                type={EditableHeading.types.h5}
                value={addTaskInput}
                onBlur={() => {
                    addTaskInput ? onAdd(addTaskInput) : setAddTask('+ Add Item')
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

const DynamicCmp = ({ cmpType, info, boardId, groupId, taskId, onUpdate }) => {

    switch (cmpType) {
        case "side":
            return <Side info={info} />;
        case "priority":
            return <Priority info={info} />;
        case "title":
            return <TaskTitle info={info}
                boardId={boardId}
                groupId={groupId}
                taskId={taskId}
                onUpdate={onUpdate} />;
        case "status":
            return <Status info={info} />;
        case "memberIds":
            return <Member info={info} />;
        case "dueDate":
            return <Date info={info} />;

        default:
            break;
    }
}