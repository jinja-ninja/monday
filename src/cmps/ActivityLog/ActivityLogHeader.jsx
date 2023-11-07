import { Avatar, EditableHeading, IconButton, Tab, TabList } from "monday-ui-react-core";
import { Close, Menu } from "monday-ui-react-core/icons";
import { userService } from "../../services/user.service";

export function ActivityLogHeader({ boardTitle, setIsActivityLog }) {
    let loggedInUser = userService.getLoggedinUser()
    return (

        <div className="activity-log-header">
            <IconButton
                ariaLabel=""
                icon={Close}
                onClick={() => setIsActivityLog(false)}
                size="xs"
            />
            <div className="editible-container">
                <div className="board-title-container">
                    <span className="board-title">
                        {boardTitle}
                    </span>
                    <span className="log-word">
                        Log
                    </span>
                </div>

                <div className="avatar-and-icon-container">
                    <Avatar
                        ariaLabel={loggedInUser ? loggedInUser.fullname : 'Guest'}
                        size="small"
                        src={loggedInUser ? loggedInUser.imgUrl : "https://cdn1.monday.com/dapulse_default_photo.png"}
                        type="img"
                    />
                    <div></div>
                    <IconButton
                        icon={Menu}
                        size="50"
                    />
                </div>
            </div>

            <div className="task-details-header-navbar">
                <TabList
                    size="sm">
                    <Tab>
                        Activity
                    </Tab>
                </TabList>
            </div>
        </div>
    )
}

