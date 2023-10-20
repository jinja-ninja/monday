import { Button } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add } from "monday-ui-react-core/icons"
import { addGroup } from "../store/actions/board.action"
import { BoardKanban } from "../pages/BoardKanban"

export function GroupList({ groups, labels, cmpsOrder, progress, boardId, priorities }) {
    console.log('progress:', progress)
    // here we need to render either kanban or the BoardDetails check by params what to render

    return <div className="group-list-container">
        {/* <BoardKanban />
     OR
     BoardDetails ↓↓↓↓ */}
     {/* <BoardKanban/> */}
        <ul className="group-list">
            {groups && groups.map((group) => {
                return <li key={group.id} className="group-list-item" data-group-id={group.id}>
                    <GroupPreview
                        group={group}
                        boardId={boardId}
                        labels={labels}
                        cmpsOrder={cmpsOrder}
                        progress={progress}
                        priorities={priorities}
                        key={`group-preview-${group.id}`} />
                </li>
            })}
        </ul >

        <Button
            onClick={() => { addGroup(boardId) }}
            kind="secondary"
            size="small"
            leftIcon={Add}>
            Add new group
        </Button>
    </div >
}

