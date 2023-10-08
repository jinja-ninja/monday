import { Checkbox } from "monday-ui-react-core"
import { useDispatch, useSelector } from "react-redux"
import { ADD_SELECTED_TASK, REMOVE_SELECTED_TASK, SET_SELECTED_TASKS } from "../../store/reducers/board.reducer"
import { useEffect, useState } from "react"

export function Side({ info, taskId, groupId }) {
    const [isChecked, setIsChecked] = useState(false)
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)

    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedTasks.length === 0) setIsChecked(false)
        const isSelected = selectedTasks.some(task => task.taskId === taskId && task.groupId === groupId)
        setIsChecked(isSelected)
    }, [selectedTasks])

    // width: 7px;
    // height: 16px;
    // border - radius: var(--border - radius - small) 0 0 var(--border - radius - small);
    // background - color: green;


    function selectTask(e) {
        const taskIds = { groupId, taskId }
        if (e.target.checked) {
            dispatch({ type: ADD_SELECTED_TASK, selectedTask: taskIds })
            setIsChecked(true)
        } else {
            const taskIndexToRemove = selectedTasks.findIndex(
                task => task.groupId === groupId && task.taskId === taskId
            )
            if (taskIndexToRemove !== -1) {
                dispatch({ type: REMOVE_SELECTED_TASK, selectedTask: taskIds })
                setIsChecked(false)
            }
        }
    }

    return <div className={"task-side-wrapper"}>

        <div className="task-side">
            <div className="color-indicator"
                style={{
                    backgroundColor: `var(--color-${info})`
                }}>
            </div>

            <div className="task-select">
                <Checkbox checked={isChecked} onChange={(e) => selectTask(e)} ariaLabel="Select task" />
            </div>
        </div>
    </div >
}