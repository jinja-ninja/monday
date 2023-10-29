import { Avatar, EditableHeading, IconButton, Tab, TabList } from "monday-ui-react-core";
import { Close, Home, Menu } from "monday-ui-react-core/icons"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../store/actions/board.action";

export function TaskDetailsHeader({ boardId, groupId, taskId, taskTitle, setCurrTab }) {
    const [taskTitleValue, setTaskTitleValue] = useState(taskTitle)
    const navigate = useNavigate()
    const isInsideKanban = window.location.hash.includes('/kanban');

    function onRenameTask() {
        if (taskTitle !== taskTitleValue) {
            updateTask(boardId, groupId, taskId, { key: 'title', value: taskTitleValue })
        }
    }

    let dynNavigate
    if (isInsideKanban) {
        dynNavigate = `/board/${boardId}/views/kanban`
    } else {
        dynNavigate = `/board/${boardId}`
    }

    return (
        <div className="task-details-header" >

            <IconButton
                ariaLabel=""
                icon={Close}
                onClick={() => navigate(dynNavigate)}
                size="xs"
            />
            <div className="editible-container">
                <EditableHeading
                    type="h4"
                    value={taskTitle}
                    onChange={(newText) => setTaskTitleValue(newText)}
                    onFinishEditing={() => onRenameTask()}

                />

                <div className="avatar-and-icon-container">
                    <Avatar
                        ariaLabel="Hadas Fahri"
                        size="small"
                        src="https://cdn1.monday.com/dapulse_default_photo.png"
                        type="img"
                    />
                    <div></div>
                    <IconButton
                        ariaLabel="Add"
                        icon={Menu}
                        size="50"
                    // onClick={function noRefCheck() { }}
                    />
                </div>
            </div>
            <div className="task-details-header-navbar">
                <TabList
                    size="sm">
                    <Tab
                        onClick={() => setCurrTab('updates')}
                        icon={Home}
                        iconSide="left">

                        Updates
                    </Tab>
                    <Tab
                        onClick={() => setCurrTab('files')}>
                        Files
                    </Tab>
                    <Tab
                        onClick={() => setCurrTab('activityLog')}>
                        Activity Log
                    </Tab>
                </TabList>
            </div>

        </div>
    )
}