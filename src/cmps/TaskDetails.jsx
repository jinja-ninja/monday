import { TaskDetailsHeader } from "./TaskDetailsHeader";
import { TaskUpdates } from "./TaskUpdates";

export function TaskDetails() {

    return (
        <div className="task-details-container">
            <TaskDetailsHeader />
            <main>
                <TaskUpdates />
            </main>
        </div>
    )
}