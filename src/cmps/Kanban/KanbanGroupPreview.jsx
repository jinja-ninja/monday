import { Icon } from "monday-ui-react-core"
import { KanbanTask } from "./KanbanTask"
import { Add, AddSmall } from "monday-ui-react-core/icons"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { addTask } from "../../store/actions/board.action"
import { boardService } from "../../services/board.service.local"

export function KanbanGroupPreview({ group, labels, onAddKanbanTask }) {

    function getLabelColor(labelTitle) {
        const label = labels.find(label => label.title === labelTitle || labelTitle === 'Blank')
        if (!label) return null
        return label.color
    }


    return (
        <div className="kanban-group-preview">
            <div className="group-header" style={{
                backgroundColor: `var(--color-${getLabelColor(group.name)})`
            }}>
                <p>{group.name} / {group.tasks.length}</p>
                <div className="btn-add-task-container" onClick={() => onAddKanbanTask(group.name)}>
                    <div className="btn-add-task">
                        <div className="line-one"></div>
                        <div className="line-two"></div>
                    </div>
                </div>
            </div>

            <div className="kanban-tasks-container">
                {group.tasks.map(task => {
                    return <KanbanTask task={task} groupId={group.id} key={task.id} statusName={group.name} getLabelColor={getLabelColor} />
                })}
            </div>

        </div>
    )
}