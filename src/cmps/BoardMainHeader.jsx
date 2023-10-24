import imgLogo from "../assets/img/Funday-logo.png"
import { DoubleCheck, Notifications, Inbox, Invite, Search, Help, LogIn, Hide } from "monday-ui-react-core/icons"
import { Icon } from "monday-ui-react-core"
import { Tooltip, } from "monday-ui-react-core"
import { IconButton, } from "monday-ui-react-core"
import { useNavigate } from "react-router-dom"

export function BoardMainHeader({ board, onRemoveBoard, onEditBoard }) {
    const navigate = useNavigate()
    return (

        <div className="board-main-header flex monday-storybook-tooltip_box">
            <div className="header-logo ">
                <img src={imgLogo} alt="monday-logo" onClick={() => navigate('/board')} />
            </div>
            <div className="header-bar">
                <IconButton
                    ariaLabel="Notifications"
                    icon={Notifications}
                // onClick={function noRefCheck() { }}
                />
                <IconButton
                    ariaLabel="Inbox"
                    icon={Inbox}
                // onClick={function noRefCheck() { }}
                />
                <IconButton
                    ariaLabel="Invite"
                    icon={Invite}
                // onClick={function noRefCheck() { }}
                />

                <div className="seperate-line"> | </div>
                <IconButton
                    ariaLabel="Search"
                    icon={Search}
                // onClick={function noRefCheck() { }}
                />
                <IconButton
                    ariaLabel="Help"
                    icon={Help}
                // onClick={function noRefCheck() { }}
                />
                <IconButton
                    onClick={() => navigate('/auth/login')}
                    ariaLabel="Login"
                    icon={LogIn}
                // onClick={function noRefCheck() { }}
                />
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