import { Tooltip } from "monday-ui-react-core";

export function StatusSummary({ dynCollapseGroupClass, group,labels, calculatePercentages, getPriorityOrStatusColor }) {

    return (
        <div className={"task-list-summary " + dynCollapseGroupClass}>
            {calculatePercentages(group.tasks, 'status').map((status, index) => (
                <Tooltip
                    key={index}
                    content={`${status.status} ${status.count}/${group.tasks.length} ${status.percentage}% `}
                    animationType="expand">
                    <div
                        className="label-progress-item"
                        style={{
                            width: `${status.percentage}%`,
                            backgroundColor: `var(--color-${getPriorityOrStatusColor(status.status, labels)})`,
                            height: '24px',
                        }}
                    >
                    </div>
                </Tooltip>
            ))}
            {group.tasks.length === 0 && <div className="status-sum-container"></div>}
        </div>
    )
}