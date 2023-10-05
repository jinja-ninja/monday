import { Avatar, EditableHeading, IconButton, Tab, TabList } from "monday-ui-react-core";
import { Close, Home, Menu } from "monday-ui-react-core/icons"

export function TaskDetailsHeader() {

    return (
        <div className="task-details-header" >

            <IconButton
                ariaLabel=""
                icon={Close}
                //   onClick={function noRefCheck(){}}
                size="xs"
            />
            <div className="editible-container">
                <EditableHeading
                    type="h4"
                    value="Task name"
                />

                <div className="avatar-and-icon-container">
                    <Avatar
                        ariaLabel="Hadas Fahri"
                        size="small"
                        src="https://style.monday.com/static/media/person1.de30c8ee.png"
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
                        icon={Home}
                        iconSide="left">
                        Updates
                    </Tab>
                    <Tab >
                        Files
                    </Tab>
                    <Tab >
                        Activity Log
                    </Tab>
                </TabList>
            </div>

        </div>
    )
}