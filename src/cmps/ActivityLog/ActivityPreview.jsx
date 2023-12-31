import { Icon, Text } from "monday-ui-react-core"
import { Add, Calendar, Comment, Delete, Edit, Favorite, File, Invite, NavigationChevronRight, Person, Status, TextCopy, Time, Timeline, Update } from "monday-ui-react-core/icons"
import { utilService } from "../../services/util.service"
import { ActivityStatus } from "../dynamicActivityCmps/ActivityStatus"
import { useSelector } from "react-redux"

export function ActivityPreview({ activity }) {
    const currBoard = useSelector(state => state.boardModule.board)
    const labels = currBoard.labels
    const priorities = currBoard.priorities
    const members = currBoard.members
    const activityTitle = activity.task?.title || activity.group?.title || currBoard.title

    function getLabelColor(labelTitle) {
        const label = labels.find(label => label.title === labelTitle)
        if (!label) return null
        return label.color
    }

    function getPriorityColor(priorityTitle) {
        const priority = priorities.find(priority => priority.title === priorityTitle)
        if (!priority) return null
        return priority.color
    }

    function getMemberName(memberId) {
        const member = members.find(member => member._id === memberId)
        if (!member) return null
        return member
    }

    function getTitle(prevTitle) {
        if (activity.action.type === 'Person') return prevTitle.map(memberId => getMemberName(memberId))
        else return prevTitle
    }

    function getColor(type, title) {
        if (type === 'Status') return getLabelColor(title)
        else if (type === 'Priority') return getPriorityColor(title)
        else if (type === 'Edit') return title
        else return null
    }

    return <li className="activity-list-item">

        <div className="created">
            <div className="created-at">
                <Icon icon={Time} />
                <span>{utilService.timeSince(activity.createdAt)}</span>
            </div>

            <img className="activity-member-img" src={activity.byMember.imgUrl} alt="" />
        </div>

        <Text className="title" ellipsis>
            {activity.task?.title || activity.group?.title || currBoard.title}
        </Text>

        <div className="activity-type">
            {dynIcon(activity.action.type)}
            <Text className="title" ellipsis>
                {activity.action.type}
            </Text>
        </div>

        <div className="action-description">
            <ActivityStatus
                type={activity.action.type}
                fromStatus={{
                    title: getTitle(activity.action.from) || '-',
                    color: getColor(activity.action.type, activity.action.from),
                }}
                toStatus={{
                    title: getTitle(activity.action.to) || '-',
                    color: getColor(activity.action.type, activity.action.to),
                }}
                activityTitle={activityTitle}
            />
        </div>

    </li>
}

function dynIcon(type) {
    switch (type) {
        case 'Person':
            return <Icon icon={Person} />
        case 'Status':
            return <Icon icon={Status} />
        case 'Priority':
            return <Icon icon={Status} />
        case 'Date':
            return <Icon icon={Calendar} />
        case 'Timeline':
            return <Icon icon={Timeline} />
        case 'Favorite':
            return <Icon icon={Favorite} />
        case 'Comment':
            return <Icon icon={Comment} />
        case 'Created':
            return <Icon icon={Add} />
        case 'File':
            return <Icon icon={File} />
        case 'Name':
            return <Icon icon={TextCopy} />
        case 'Update':
            return <Icon icon={Update} />
        case 'Group Color':
            return <Icon icon={Edit} />
        case 'Deleted':
            return <Icon icon={Delete} />
        case 'Subscribed':
            return <Icon icon={Invite} />
        default:
            break
    }
}