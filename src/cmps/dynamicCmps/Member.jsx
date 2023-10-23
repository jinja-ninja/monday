import { Avatar, AvatarGroup, Icon } from "monday-ui-react-core"
import { Add, AddSmall, PersonRound } from "monday-ui-react-core/icons"
import PersonCircle from '../../assets/Icons/PersonCircle.svg'
export function Member({ info }) {

    return <div className="task-members">

        <img className="person-circle" src={PersonCircle} alt="" />

        <div className="btn-add-member">
            <div className="line-one"></div>
            <div className="line-two"></div>
        </div>
    </div>
}

