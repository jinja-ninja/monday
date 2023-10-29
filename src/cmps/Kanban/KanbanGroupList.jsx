import { KanbanGroupPreview } from "./KanbanGroupPreview"

export function KanbanGroupList({ getKanbanGroups, labels, currBoard }) {
    const groups = getKanbanGroups()

    return (
        <div className="kanban-group-list">
            {groups.map((group, idx) =>
                <KanbanGroupPreview key={idx} group={group} labels={labels} currBoard={currBoard} />
            )}
        </div>
    )
}