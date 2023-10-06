import { Button } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add } from "monday-ui-react-core/icons"
import { addGroup } from "../store/actions/board.action"

export function GroupList({ groups, labels, cmpsOrder, progress, boardId }) {

    return <div className="group-list-container">
        <ul className="group-list">
            {groups && groups.map((group) => {
                return <li key={group.id} className="group-list-item" data-group-id={group.id}>
                    <GroupPreview
                        group={group}
                        boardId={boardId}
                        labels={labels}
                        cmpsOrder={cmpsOrder}
                        progress={progress}
                        key={`group-preview-${group.id}`} />
                </li>
            })}
        </ul >

        <Button
            onClick={() => { addGroup(boardId) }}
            kind="secondary"
            size="small"
            leftIcon={Add}>
            Add new Group
        </Button>
    </div >
}

