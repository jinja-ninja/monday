import { Icon } from "monday-ui-react-core";
import { Close, Delete, Duplicate } from "monday-ui-react-core/icons";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SET_SELECTED_TASKS } from "../store/reducers/board.reducer";
import { useDispatch } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { removeBatchTasks } from "../store/actions/board.action";

export function SelectedModal({ selectedTasks, currBoard }) {
    const [groupColors, setGroupColors] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getAllTaskColors()
    }, [selectedTasks])

    function getAllTaskColors() {
        const colors = selectedTasks.map(groupTaskIds => boardService.getGroupByTask(currBoard, groupTaskIds.groupId).style)
        console.log('colors:', colors)
        setGroupColors(colors)
    }
    function onCloseModal() {
        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: [] })
    }


    async function onRemoveTasks() {
        // const actions = selectedTasks.map(groupTaskIds => {
        //     const group = boardService.getGroupById(currBoard, groupTaskIds.taskId)
        //     const task = boardService.getTaskById(currBoard, groupTaskIds.taskId)
        //     return {
        //         description: task.title,
        //         groupTitle: group.title,
        //         groupColor: group.style,
        //         type: 'Deleted task',
        //     }
        //     actions is for activities
        // })
        const actions = []
        try {
            await removeBatchTasks(currBoard._id, selectedTasks, actions)
            showSuccessMsg('Deleted multiple tasks')
        } catch {
            showErrorMsg('Error deleting tasks')
        }
    }

    // async function onDuplicate() {
    // 	for (let taskId of checkedTaskIds) {
    // 		try {
    // 			const group = await boardService.getGroupByTask(board, taskId)
    // 			const task = await boardService.getTaskById(board, taskId)
    // 			await duplicateTask(board._id, group, task, true)
    // 		} catch (err) {
    // 			showErrorMsg('Error duplicating tasks')
    // 		}
    // 	}
    // }

    return (
        <div className="selected-modal-container">
            <div className="number-dots-container">
                <div className="selected-counter-container">{selectedTasks.length}</div>

                <div className="items-selected-container">
                    <p>Items selected</p>
                    <div className="dots-container">
                        {groupColors.map((color, idx) => (
                            <div key={idx} className="dot" style={{ backgroundColor: `var(--color-${color})` }}></div>
                        ))}

                    </div>
                </div>
            </div>

            <div className="btns-container">
                <div className="duplicate-btn-container">
                    <Icon className='duplicate-btn' icon={Duplicate} />
                    <span>Duplicate</span>
                </div>
                <div className="delete-btn-container">
                    <Icon className='delete-btn' icon={Delete} onClick={() => onRemoveTasks()} />
                    <span>Delete</span>
                </div>

                <div className="close-btn-container">
                    <Icon className='close-btn' icon={Close} onClick={() => onCloseModal()} />
                </div>
            </div>
        </div>
    )
}