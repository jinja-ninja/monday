import { useParams } from "react-router-dom";
import { TaskDetailsHeader } from "./TaskDetailsHeader";
import { TaskUpdates } from "./TaskUpdates";
import { useSelector } from "react-redux";
import { boardService } from "../services/board.service.local";
import { useEffect, useState } from "react";
import { TaskFiles } from "./TaskFiles";
import { TaskActvity } from "./TaskActivity";

export function TaskDetails() {
    const [currTask, setCurrTask] = useState(null)
    const [currTab, setCurrTab] = useState('updates')
    const { boardId, groupId, taskId } = useParams()
    const currBoard = useSelector(state => state.boardModule.board)

    useEffect(() => {
        loadTask()
    }, [taskId, currBoard])

    async function loadTask() {
        const task = await boardService.getTaskById(boardId, groupId, taskId)
        setCurrTask(task)
    }


    if (!currTask) return <div>Loading task...</div>
    console.log('currTask.title:', currTask.title)
    return (
        <div className="task-details-container">
            <TaskDetailsHeader boardId={boardId} groupId={groupId} taskId={taskId} taskTitle={currTask.title} setCurrTab={setCurrTab} />
            <main>
                {currTab === 'updates' && <TaskUpdates boardId={boardId} groupId={groupId} taskId={taskId} currTask={currTask} />}
                {currTab === 'files' && <TaskFiles />}
                {currTab === 'activityLog' && <TaskActvity />}
            </main >
        </div >
    )
}