import { utilService } from "../../services/util.service"

export function DateSummary({ dynCollapseGroupClass,group }) {
    let datesSummary = getSmallestAndBiggestDates()

    function getAllDates() {
        return group.tasks.filter(task => task.dueDate).map(task => task.dueDate)
    }

    function getSmallestAndBiggestDates() {
        const dates = getAllDates()

        if (dates.length === 0) {
            return { from: null, to: null }
        }

        const smallestDate = Math.min(...dates)
        const biggestDate = Math.max(...dates)

        return { from: smallestDate, to: biggestDate }

    }
    return (
        <div className={"task-list-summary " + dynCollapseGroupClass}>
            <div className="date-summary-container" style={
                (!datesSummary || !datesSummary.from || !datesSummary.to) ?
                    { backgroundColor: '#c4c4c4' } :
                    {
                        background: `linear-gradient(to right, 
                                var(--color-${group.style}) ${utilService.calculateTimelineProgress(datesSummary)}, 
                                #333333 ${utilService.calculateTimelineProgress(datesSummary)})`
                    }
            }>
                <span className="dates-summary-txt">{`${utilService.getTimelineRange(datesSummary)}`}</span>
                {datesSummary.from && datesSummary.to && <span className="dates-summary-days-txt">{utilService.getTimestampInDays(datesSummary) + 'd'}</span>}

            </div>
        </div>
    )
}