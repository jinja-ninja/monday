import { Icon } from "monday-ui-react-core";
import { NavigationChevronRight } from "monday-ui-react-core/icons";
import { utilService } from "../../services/util.service";

export function ActivityStatus({ fromStatus, toStatus }) {

    console.log('fromStatus:', fromStatus)
    console.log('toStatus:', toStatus)

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
            {typeof toStatus.title === 'number'
                ? utilService.timeStampToDate(toStatus.title)
                : toStatus.title
            }
        </div>
    </>
}