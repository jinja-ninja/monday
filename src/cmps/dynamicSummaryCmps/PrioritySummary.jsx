import { Tooltip } from "monday-ui-react-core";

export function PrioritySummary({ group, priorities, calculatePercentages, getPriorityOrStatusColor }) {

    return (
        <>
            {calculatePercentages(group.tasks, 'priority').map((priority, index) => (
                <Tooltip
                    key={index}
                    content={`${priority.priority} ${priority.count}/${group.tasks.length} ${priority.percentage}% `}
                    animationType="expand">
                    <div
                        className="label-progress-item"
                        style={{
                            width: `${priority.percentage}%`,
                            backgroundColor: `var(--color-${getPriorityOrStatusColor(priority.priority, priorities)})`,
                            height: '24px',
                        }}
                    >
                    </div>
                </Tooltip>

            ))}
            {group.tasks.length === 0 && <div className="status-sum-container"></div>}
        </>

    )
}