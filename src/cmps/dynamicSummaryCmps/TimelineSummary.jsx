import { utilService } from "../../services/util.service";

export function TimelineSummary({group }) {
    let timelineSummary = getSmallestFromAndLargestTo()

    function getAllTimelines() {
        return group.tasks.filter(task => task.timeline).map(task => task.timeline)
    }

    function getSmallestFromAndLargestTo() {
        const timelines = getAllTimelines()

        if (timelines.length === 0) {
            return { from: null, to: null }
        }
        const smallestFrom = Math.min(...timelines.map(timeline => timeline.from))
        const biggestTo = Math.max(...timelines.map(timeline => timeline.to))

        return { from: smallestFrom, to: biggestTo }
    }

    return (
        <>
            <div className="timeline-summary-container" style={
                (!timelineSummary || !timelineSummary.from || !timelineSummary.to) ?
                    { backgroundColor: '#c4c4c4' } :
                    {
                        background: `linear-gradient(to right, 
                                var(--color-${group.style}) ${utilService.calculateTimelineProgress(timelineSummary)}, 
                                #333333 ${utilService.calculateTimelineProgress(timelineSummary)})`
                    }
            }>
                <span className="timeline-summary-txt">{`${utilService.getTimelineRange(timelineSummary)}`}</span>
                {timelineSummary.from && timelineSummary.to && <span className="timeline-summary-days-txt">{utilService.getTimestampInDays(timelineSummary) + 'd'}</span>}
            </div>
        </>

    )
}