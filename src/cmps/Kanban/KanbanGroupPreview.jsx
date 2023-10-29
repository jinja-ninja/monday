import { Icon } from "monday-ui-react-core"
import { KanbanTask } from "./KanbanTask"
import { Add, AddSmall } from "monday-ui-react-core/icons"

export function KanbanGroupPreview({ group, labels }) {

    function getLabelColor(labelTitle) {
        const label = labels.find(label => label.title === labelTitle || labelTitle === 'Blank')
        if (!label) return null
        return label.color
    }
    return (
        <div className="kanban-gorup-preview">
            <div className="group-header" style={{
                backgroundColor: `var(--color-${getLabelColor(group.name)})`
            }}>
                <p>{group.name} / {group.tasks.length}</p>
                <div className="btn-add-task-container">
                    {/* <div className="btn-add-task"> */}
                        {/* <Icon icon={AddSmall} className="plus-icon" /> */}
                        <Icon icon={Add} className="plus-icon" />
                    {/* </div> */}
                </div>
            </div>

            <div className="kanban-tasks-container">
                {group.tasks.map(task => {
                    return <KanbanTask task={task} groupId={group.id} key={task.id} statusName={group.name} getLabelColor={getLabelColor}/>
                })}
            </div>

        </div>
    )
}