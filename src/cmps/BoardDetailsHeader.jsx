import { EditableHeading, IconButton, Tab, TabList } from "monday-ui-react-core";
import { Favorite, Home, Info } from "monday-ui-react-core/icons";
import { Link } from "react-router-dom";


export function BoardDetailsHeader({ title }) {

    return <div className="header-wrapper">
        <div className="header-info">
            <div className="board-header">
                <div className="board-title">
                    <EditableHeading type={EditableHeading.types.h2} value={title} />
                    <IconButton
                        ariaLabel="Show board description"
                        icon={Info}
                        tooltipProps={{ position: "top" }}
                    />
                    <IconButton
                        ariaLabel="Add to favorites"
                        icon={Favorite}
                        tooltipProps={{ position: "top" }}
                    />
                </div>

                <div className="header-description">
                    Manage any type of project. Assign owners, set timelines and keep track of where your project stands.
                    <Link to="#"><span>Read More...</span></Link>
                </div>
            </div>

            <div className="header-navbar">
                {/* <TabList>
                    <Tab 
                        icon={Home}
                        iconSide="left">
                        Main Table
                    </Tab>
                    <Tab >
                        Kanban
                    </Tab>
                </TabList> */}
            </div>
        </div>
    </div>
}