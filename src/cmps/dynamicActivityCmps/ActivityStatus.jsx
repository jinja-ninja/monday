import { Avatar, Icon, Text } from "monday-ui-react-core";
import { NavigationChevronRight } from "monday-ui-react-core/icons";
import { utilService } from "../../services/util.service";

export function ActivityStatus({ type, fromStatus, toStatus, activityTitle = null }) {
    function getTitle(type, title) {
        let idx
        switch (type) {
            case 'Date':
                if (!title || title === '-') return '-'
                return utilService.timeStampToDate(title)
            case 'Person':
                if (title.length === 0) return '-'
                return <div className="activity-members-container">{
                    title.map(member =>
                        <Avatar size={Avatar.sizes.SMALL}
                            src={member.imgUrl}
                            type="img"
                            ariaLabel={member.fullname}
                        />)
                }
                </div>
            case 'Timeline':
                if (!title || title === '-') return <div className="activity-timeline-container">
                    <Text style={{ color: 'white' }} ellipsis>
                        -
                    </Text>
                </div>
                return <div className="activity-timeline-container" style={{ backgroundColor: 'rgb(2, 134, 195)' }}>
                    <Text style={{ color: 'white' }} ellipsis>
                        {utilService.getTimelineRange(title)}
                    </Text>
                </div>
            case 'Favorite':
                if (!title || title === '-') return '-'
                return 'Added'
            case 'Comment':
                if (!title || title === '-') return '-'
                idx = (title.length > 0) ? 0 : (title.length - 1)
                return title[idx]?.txt ? title[idx].txt : '-'
            case 'File':
                if (!title || title === '-') return '-'
                idx = (title.length > 0) ? 0 : (title.length - 1)
                return title[idx]?.url ? <img className="activity-file-img" src={title[idx].url} alt="" /> : '-'
            case 'Group Color':
                if (!title || title === '-') return '-'
                console.log('activityTitle:', activityTitle)
                return <div className="activity-group-color-container" >
                    <Text ellipsis style={{ color: `var(--color-${title})` }}>
                        {activityTitle}
                    </Text>
                </div>
            default:
                return title
        }
    }

    return <>
        <div
            className="old-status"
            style={{
                backgroundColor: fromStatus.color && `var(--color-${fromStatus.color})`,
                color: fromStatus.color ? 'white' : 'unset'
            }}
        >
            <Text ellipsis style={{ color: fromStatus.color ? 'white' : 'unset' }}>
                {getTitle(type, fromStatus.title)}
            </Text>
        </div>
        <Icon icon={NavigationChevronRight} />
        <div
            className="new-status"
            style={{
                backgroundColor: toStatus.color && `var(--color-${toStatus.color})`,
                color: toStatus.color ? 'white' : 'unset'
            }}
        >
            <Text ellipsis style={{ color: toStatus.color ? 'white' : 'unset' }}>
                {getTitle(type, toStatus.title)}
            </Text>
        </div>
    </>
}