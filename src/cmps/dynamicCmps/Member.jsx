import { Avatar, AvatarGroup, Icon } from "monday-ui-react-core"
import { Add, AddSmall, PersonRound } from "monday-ui-react-core/icons"
import PersonCircle from '../../assets/Icons/PersonCircle.svg'
export function Member({ info }) {

    return <div className="task-members">
        {/* <AvatarGroup
            max={3}
            size="small"
            type="img"
        >
            <Avatar
                ariaLabel="Hadas Fahri"
                src="https://style.monday.com/static/media/person1.de30c8ee.png"
                type="img"
            />
            <Avatar
                ariaLabel="Sergey Roytman"
                src="https://style.monday.com/static/media/person2.24c7233e.png"
                type="img"
            />
            <Avatar
                ariaLabel="Yossi Saadi"
                src="https://style.monday.com/static/media/person3.3661bfe5.png"
                type="img"
            />
            <Avatar
                ariaLabel="Hadas Fahri"
                src="https://style.monday.com/static/media/person1.de30c8ee.png"
                type="img"
            />
            <Avatar
                ariaLabel="Sergey Roytman"
                src="https://style.monday.com/static/media/person2.24c7233e.png"
                type="img"
            />
            <Avatar
                ariaLabel="Yossi Saadi"
                src="https://style.monday.com/static/media/person3.3661bfe5.png"
                type="img"
            />
            <Avatar
                ariaLabel="Hadas Fahri"
                src="https://style.monday.com/static/media/person1.de30c8ee.png"
                type="img"
            />
            <Avatar
                ariaLabel="Sergey Roytman"
                src="https://style.monday.com/static/media/person2.24c7233e.png"
                type="img"
            />
            <Avatar
                ariaLabel="Yossi Saadi"
                src="https://style.monday.com/static/media/person3.3661bfe5.png"
                type="img"
            />
            <Avatar
                ariaLabel="Hadas Fahri"
                src="https://style.monday.com/static/media/person1.de30c8ee.png"
                type="img"
            />
            <Avatar
                ariaLabel="Sergey Roytman"
                src="https://style.monday.com/static/media/person2.24c7233e.png"
                type="img"
            />
            <Avatar
                ariaLabel="Yossi Saadi"
                src="https://style.monday.com/static/media/person3.3661bfe5.png"
                type="img"
            />
            <Avatar
                ariaLabel="Mark Roytstein"
                text="MR"
                type="text"
            />
        </AvatarGroup> */}
        <img className="person-circle" src={PersonCircle} alt="" />
        
        <div className="btn-add-member">
          {/* PLUS ICON */}
        </div>
    </div>
}

