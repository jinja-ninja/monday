import { KanbanTask } from "./KanbanTask"
import { Draggable, Droppable } from "react-beautiful-dnd"

export function KanbanGroupPreview({ group, labels, onAddKanbanTask, index }) {

    function getLabelColor(labelTitle) {
        const label = labels.find(label => label.title === labelTitle || labelTitle === 'Blank')
        if (!label) return null
        return label.color
    }

    return (
        <Draggable draggableId={`kanban-group-${group.name}`} index={index} key={`kanban-group-${group.name}-${index}`}>
            {(provided) => (
                <div
                    className="kanban-group-preview"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
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

                    <Droppable droppableId={`kanban-tasks-${group.name}`} type="kanban-tasks">
                        {(provided) => (
                            <div
                                className="kanban-tasks-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {group.tasks.map((task, index) => {
                                    return <KanbanTask
                                        task={task}
                                        groupId={group.id}
                                        key={task.id}
                                        statusName={group.name}
                                        getLabelColor={getLabelColor}
                                        index={index}
                                    />
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </div>
            )}
        </Draggable>
    )
}