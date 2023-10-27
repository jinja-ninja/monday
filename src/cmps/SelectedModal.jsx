import { Icon } from "monday-ui-react-core";
import { Close, Delete, Duplicate } from "monday-ui-react-core/icons";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SET_SELECTED_TASKS } from "../store/reducers/board.reducer";
import { useDispatch } from "react-redux";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { duplicatedBatchTasks, duplicatedTask, removeBatchTasks } from "../store/actions/board.action";

export function SelectedModal({ selectedTasks, currBoard }) {
    const [groupColors, setGroupColors] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getAllTaskColors()
    }, [selectedTasks])

    function getAllTaskColors() {
        const colors = selectedTasks.map(groupTaskIds => boardService.getGroupById(currBoard, groupTaskIds.groupId).style)
        setGroupColors(colors)
    }
    function onCloseModal() {
        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: [] })
    }

    async function onRemoveTasks() {
        const actions = []
        try {
            await removeBatchTasks(currBoard._id, selectedTasks, actions)
            showSuccessMsg('Deleted multiple tasks')
        } catch {
            showErrorMsg('Error deleting tasks')
        }
    }

    async function onDuplicateTasks() {
        console.log('currBoard._id:', currBoard._id)
        console.log('selectedTasks:', selectedTasks)
        try {
            await duplicatedBatchTasks(currBoard._id, selectedTasks)
            showSuccessMsg('Duplicated multiple tasks')
        } catch (err) {
            showErrorMsg('Error duplicating tasks')
        }

        dispatch({ type: SET_SELECTED_TASKS, selectedTasks: [] })
    }

    return (
        <div className="selected-modal-container">
            <div className="number-dots-container">
                <div className="selected-counter-container">{selectedTasks.length}</div>

                <div className="items-selected-container">
                    <p>{selectedTasks.length === 1 ? 'Item' : 'Items'} selected</p>
                    <div className="dots-container">
                        {groupColors.map((color, idx) => (
                            <div key={idx} className="dot" style={{ backgroundColor: `var(--color-${color})` }}></div>
                        ))}

                    </div>
                </div>
            </div>

            <div className="btns-container">
                <div className="duplicate-btn-container" onClick={() => onDuplicateTasks()}>
                    <Icon className='duplicate-btn' icon={Duplicate} />
                    <span>Duplicate</span>
                </div>
                <div className="delete-btn-container" onClick={() => onRemoveTasks()}>
                    <Icon className='delete-btn' icon={Delete} />
                    <span>Delete</span>
                </div>

                <div className="close-btn-container">
                    <Icon className='close-btn' icon={Close} onClick={() => onCloseModal()} />
                </div>
            </div>
        </div>
    )
}