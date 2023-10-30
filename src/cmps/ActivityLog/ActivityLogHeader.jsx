import { Avatar, EditableHeading, IconButton } from "monday-ui-react-core";
import { Close, Menu } from "monday-ui-react-core/icons";

export function ActivityLogHeader({ boardTitle, setIsActivityLog }) {

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
                        ariaLabel="Gal Ben Natan"
                        size="small"
                        src="https://cdn1.monday.com/dapulse_default_photo.png"
                        type="img"
                    />
                    <div></div>
                    <IconButton
                        icon={Menu}
                        size="50"
                    />
                </div>
            </div>
        </div>
    )
}

