import { Button, IconButton, SplitButton } from "monday-ui-react-core";
import { Person, TurnInto } from "monday-ui-react-core/icons";
import { ActivityList } from "./ActivityLog/ActivityList";
import { useSelector } from "react-redux";

export function TaskActvity({ taskId }) {
    const currBoard = useSelector(state => state.boardModule.board)
    const activities = currBoard.activities.filter(activity => activity.taskId === taskId)

    return (
        <div className="task-activity-log-container">
            <div className="task-activity-log-header">
                <div className="task-activity-actions-bar">
                    <SplitButton
                        size="small"

                    >
                        Filter log
                    </SplitButton>
                    <Button
                        className="person-btn"
                        kind="tertiary"
                        size="small"
                        leftIcon={Person}
                    >
                        Person
                    </Button>
                </div>

                <IconButton
                    ariaLabel="Refresh"
                    icon={TurnInto}
                />
            </div>

            <ActivityList
                activities={activities}
            />
        </div>
    )
}