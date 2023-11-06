import imgLogo from "../assets/img/Funday-logo.png"
import { DoubleCheck, Notifications, Inbox, Invite, Search, Help, LogIn, Hide, Team } from "monday-ui-react-core/icons"
import { Avatar, Icon } from "monday-ui-react-core"
import { Tooltip, } from "monday-ui-react-core"
import { IconButton, } from "monday-ui-react-core"
import { useNavigate } from "react-router-dom"
import { userService } from "../services/user.service"
import { logout } from "../store/actions/user.actions"

export function BoardMainHeader() {
    const navigate = useNavigate()
    let loggedInUser = userService.getLoggedinUser()
    return (

        <div className="board-main-header flex monday-storybook-tooltip_box">
            <div className="header-logo ">
                <img src={imgLogo} alt="monday-logo" onClick={() => navigate('/board')} />
            </div>
            <div className="header-bar">

                <IconButton
                    ariaLabel="About us"
                    icon={Team}
                    // onClick={() => navigate('/about')}
                />
                {loggedInUser &&
                    <Avatar
                        className='avatar-img'
                        ariaLabel="Logout"
                        size={Avatar.sizes.SMALL}
                        src={loggedInUser.imgUrl ? loggedInUser.imgUrl : "https://cdn1.monday.com/dapulse_default_photo.png"}
                        type="img"
                        onClick={() => {
                            logout()
                            navigate('/')
                        }}
                    />
                }

                {!loggedInUser && <IconButton
                    ariaLabel="Login"
                    icon={LogIn}
                    onClick={() => navigate('/auth/login')}
                />}
            </div>
        </div>

    )

}
