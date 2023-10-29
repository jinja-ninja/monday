import { Icon } from "monday-ui-react-core";
import { NavigationChevronRight } from "monday-ui-react-core/icons";
import { utilService } from "../../services/util.service";

export function ActivityStatus({ type, fromStatus, toStatus }) {

    function getTitle(type) {
        switch (type) {
            case 'Date':
                return utilService.timeStampToDate(fromStatus.title)
            case 'People':

                return utilService.getNameInitials()
            default:
                return fromStatus.title
        }
    }

    return <>
        <div
            className="old-status"
            style={{
                backgroundColor: `var(--color-${fromStatus.color})`,
                color: fromStatus.color ? 'white' : 'unset'
            }}
        >
            {typeof fromStatus.title === 'number'
                ? utilService.timeStampToDate(fromStatus.title)
                : fromStatus.title
            }
        </div>
        <Icon icon={NavigationChevronRight} />
        <div
            className="new-status"
            style={{
                backgroundColor: `var(--color-${toStatus.color})`,
                color: toStatus.color ? 'white' : 'unset'
            }}
        >
            {getTitle(type)}
        </div>
    </>
}