import { Droppable } from "react-beautiful-dnd"
import { NoGroupsFound } from "../NoGroupsFound"
import { KanbanGroupPreview } from "./KanbanGroupPreview"

export function KanbanGroupList({ groups, labels, onAddKanbanTask }) {

    return (
        <>
            <Droppable droppableId="kanban-groups" type="kanban-groups" direction="column">
                {(provided) => (
                    <div
                        className="kanban-group-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ paddingBlockEnd: groups.length === 0 ? 'var(--spacing-xl)' : 'initial' }}
                    >
                        {groups.map((group, idx) =>
                            <KanbanGroupPreview
                                key={idx}
                                group={group}
                                labels={labels}
                                onAddKanbanTask={onAddKanbanTask}
                                index={idx}
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {groups.length === 0 && <NoGroupsFound cmpsOrder={2} />}
        </>
    )
}