import { NoGroupsFound } from "../NoGroupsFound"
import { KanbanGroupPreview } from "./KanbanGroupPreview"

export function KanbanGroupList({ getKanbanGroups, labels, onAddKanbanTask }) {
    const groups = getKanbanGroups()

    return (
        <>
            <div className="kanban-group-list" style={{ paddingBlockEnd: groups.length === 0 ? 'var(--spacing-xl)' : 'initial' }}>
                {groups.map((group, idx) =>
                    <KanbanGroupPreview key={idx} group={group} labels={labels} onAddKanbanTask={onAddKanbanTask} />
                )}
            </div>

            {groups.length === 0 && <NoGroupsFound cmpsOrder={2} />}
        </>

    )
}