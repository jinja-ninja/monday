import { Icon } from "monday-ui-react-core"
import { Add, Calendar, Delete, Invite, NavigationChevronRight, Person, Status, TextCopy, Time, Update } from "monday-ui-react-core/icons"
import { utilService } from "../services/util.service"
import { ActivityStatus } from "./dynamicActivityCmps/ActivityStatus"
import { useSelector } from "react-redux"

export function ActivityPreview({ activity }) {

    const currBoard = useSelector(state => state.boardModule.board)
    const labels = currBoard.labels
    const priorities = currBoard.priorities

    function getLabelColor(labelTitle) {
        const label = labels.find(label => label.title === labelTitle)
        if (!label) return null
        return label.color
    }

    function getPriorityColor(priorityTitle) {
        const priorities = priorities.find(priority => priority.title === priorityTitle)
        if (!priority) return null
        return priority.color
    }

    console.log('activity:', activity)

    return <li className="activity-list-item">

        <div className="created">
            <div className="created-at">
                <Icon icon={Time} />
                <span>{utilService.timeSince(activity.createdAt)}</span>
            </div>

            <img src={activity.byMember.imgUrl} alt="" />
        </div>

        <div className="title">{activity.task?.title || activity.group.title}</div>

        <div className="activity-type">
            {dynIcon(activity.action.type)}
            {activity.action.type}
        </div>

        <div className="action-description">
            <ActivityStatus
                fromStatus={{ title: activity.action.from, color: getLabelColor(activity.action.from) }}
                toStatus={{ title: activity.action.to, color: getLabelColor(activity.action.to) }}
            />
        </div>

    </li>
}

function dynIcon(cmp) {
    switch (cmp) {
        case 'Person':
            return <Icon icon={Person} />
        case 'Status':
            return <Icon icon={Status} />
        case 'Priority':
            return <Icon icon={Status} />
        case 'Date':
            return <Icon icon={Calendar} />
        case 'Created':
            return <Icon icon={Add} />
        case 'Name':
            return <Icon icon={TextCopy} />
        case 'Update':
            return <Icon icon={Update} />
        case 'Deleted':
            return <Icon icon={Delete} />
        case 'Subscribed':
            return <Icon icon={Invite} />
        default:
            break
    }
}