import { Button, IconButton, SplitButton } from "monday-ui-react-core";
import { Person, TurnInto } from "monday-ui-react-core/icons";
import { ActivityList } from "./ActivityList";
import { ActivityLogHeader } from "./ActivityLogHeader";
import { useState } from "react";

export function ActivityLog({ currBoard, setIsActivityLog }) {
    // const [textFilter, setTextFilter] = useState(null)
    // let filteredActivities = currBoard.activities.filter(activity=> activity.task.title === textFilter)
    
    return (

        <div className="activity-log-container">

            <ActivityLogHeader boardTitle={currBoard.title} setIsActivityLog={setIsActivityLog} />

            <div className="task-activity-log-container">
                <div className="task-activity-log-header">
                    <div className="actions-bar">
                        <SplitButton
                            size="small"

                        >
                            Filter log
                        </SplitButton>
                        <input type="text"
                            placeholder="Filter by name"
                        />
                    </div>

                    <IconButton
                        ariaLabel="Refresh"
                        icon={TurnInto}
                    />
                </div>

                <ActivityList
                    activities={currBoard.activities}
                />
            </div>
        </div >

    )
}