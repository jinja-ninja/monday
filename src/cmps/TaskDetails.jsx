import { TaskDetailsHeader } from "./TaskDetailsHeader";
import { TaskUpdates } from "./TaskUpdates";

export function TaskDetails(boardId) {

    return (
        <div className="task-details-container">
            <TaskDetailsHeader />
            <main>
                <TaskUpdates boardId={boardId} />
            </main>
        </div>
    )
}