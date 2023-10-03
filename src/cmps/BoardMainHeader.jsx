import imgLogo from "../assets/img/mondayLogo.png"
import { DoubleCheck, Notifications, Inbox, Invite, Search, Help, LogIn, Hide } from "monday-ui-react-core/icons";
import { Icon } from "monday-ui-react-core"
import { Tooltip, } from "monday-ui-react-core"



export function BoardMainHeader({ board, onRemoveBoard, onEditBoard }) {


    return (

        <div className="board-main-header flex monday-storybook-tooltip_box">
            <div className="header-logo ">
                <img src={imgLogo} alt="monday-logo" />
            </div>
            <div className="header-bar">
                <Tooltip content="Notifications">
                    <div className="icon monday-storybook-tooltip_icon-wrapper">
                        <Icon iconType={Icon.type.SVG} icon={Notifications} iconSize={20} />
                    </div>
                </Tooltip>
                <Tooltip content="Inbox">
                    <div className="icon monday-storybook-tooltip_icon-wrapper">
                        <Icon iconType={Icon.type.SVG} icon={Inbox} iconSize={20} />
                    </div>
                </Tooltip>
                <Tooltip content="Invite">
                    <div className="icon monday-storybook-tooltip_icon-wrapper">
                        <Icon iconType={Icon.type.SVG} icon={Invite} iconSize={20} />
                    </div>
                </Tooltip>
                <div className="seperate-line"> | </div>
                <Tooltip content="Search">
                    <div className="icon monday-storybook-tooltip_icon-wrapper">
                        <Icon iconType={Icon.type.SVG} icon={Search} iconSize={20} />
                    </div>
                </Tooltip>
                <Tooltip content="Help">
                    <div className="icon monday-storybook-tooltip_icon-wrapper">
                        <Icon iconType={Icon.type.SVG} icon={Help} iconSize={20} />
                    </div>
                </Tooltip>
                <Tooltip content="Login">
                    <div className="icon monday-storybook-tooltip_icon-wrapper">
                        <Icon iconType={Icon.type.SVG} icon={LogIn} iconSize={20} />
                    </div>
                </Tooltip>
            </div>
        </div>

    )

}


{/* <div className="monday-storybook-tooltip_box">
    <Tooltip content="Hidden columns">
        <div className="monday-storybook-tooltip_icon-wrapper">
            <Icon icon={Hide} />
        </div>
    </Tooltip>
</div> */}