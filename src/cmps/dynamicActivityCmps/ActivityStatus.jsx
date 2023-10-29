import { Icon, Text } from "monday-ui-react-core";
import { NavigationChevronRight } from "monday-ui-react-core/icons";
import { utilService } from "../../services/util.service";

export function ActivityStatus({ type, fromStatus, toStatus }) {

    function getTitle(type, title) {
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
                const idx = (title.length > 0) ? 0 : (title.length - 1)
                return title[idx]?.txt ? title[idx].txt : '-'
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
            <Text ellipsis style={{color: fromStatus.color ? 'white' : 'unset'}}>
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
            <Text ellipsis style={{color: toStatus.color ? 'white' : 'unset'}}>
                {getTitle(type, toStatus.title)}
            </Text>
        </div>
    </>
}