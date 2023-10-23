import { Avatar, AvatarGroup, Icon } from "monday-ui-react-core"
import { Add, AddSmall, PersonRound } from "monday-ui-react-core/icons"
import PersonCircle from '../../assets/Icons/PersonCircle.svg'
import { useEffect, useState } from "react"
import { createPopper } from "@popperjs/core"


export function Member({ boardMembers, task }) {

    const [members, setMembers] = useState([])
    const [isMembersMenuOpen, setIsMembersMenuOpen] = useState(false)


    return <div className="task-members">

        <img className="person-circle" src={PersonCircle} alt="" />

        <div className="btn-add-member" >
            <div className="line-one"></div>
            <div className="line-two"></div>
            {/* PLUS ICON */}
        </div>
    </div>
}

