import { Icon, Text } from "monday-ui-react-core";
import { NavigationChevronRight } from "monday-ui-react-core/icons";
import { utilService } from "../../services/util.service";

export function ActivityStatus({ type, fromStatus, toStatus }) {

    function getTitle(type, title) {
        let idx
        switch (type) {
            case 'Date':
                if (!title || title === '-') return '-'
                return utilService.timeStampToDate(title)
            case 'Person':
                if (title.length === 0) return '-'
                return title.join(', ')
            case 'Timeline':
                if (!title || title === '-') return '-'
                return utilService.getTimelineRange(title)
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
                console.log('title:', title)
                console.log('idx:', idx)
                console.log('title[idx]:', title[idx])
                return title[idx]?.url ? <img src={title[idx].url} alt="" /> : '-'
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