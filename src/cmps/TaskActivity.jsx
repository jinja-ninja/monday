import { Button, IconButton, SplitButton } from "monday-ui-react-core";
import { Person, TurnInto } from "monday-ui-react-core/icons";
import { ActivityList } from "./ActivityList";
import { useSelector } from "react-redux";

export function TaskActvity() {
    const currBoard = useSelector(state => state.boardModule.board)
    const activities = currBoard.activities

    return (
        <div className="task-activity-log-container">
            <div className="task-activity-log-header">
                <div>
                    <SplitButton
                        size="small"
                    // onClick={function noRefCheck() { }}
                    // onSecondaryDialogDidHide={function noRefCheck() { }}
                    // onSecondaryDialogDidShow={function noRefCheck() { }}
                    // secondaryDialogContent={function noRefCheck() { }}
                    >
                        Filter log
                    </SplitButton>
                    <Button
                        className="person-btn"
                        kind="tertiary"
                        size="small"
                        leftIcon={Person}
                    //   onClick={function noRefCheck(){}}
                    >
                        Person
                    </Button>
                </div>

                <IconButton
                    ariaLabel="Refresh"
                    icon={TurnInto}
                // onClick={function noRefCheck() { }}
                />
            </div>
            <ActivityList
                activities={activities}
            />
        </div>
    )
}