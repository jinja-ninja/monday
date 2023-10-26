import { Button } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add } from "monday-ui-react-core/icons"
import { addGroup } from "../store/actions/board.action"
import { Droppable } from "react-beautiful-dnd"

export function GroupList({ groups, labels, cmpsOrder, boardId, priorities }) {

    return <div className="group-list-container">

        <div className="side-spacing-div"></div>

        <Droppable droppableId="groups" type="groups">
            {(provided) => (
                <ul
                    className="group-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    {groups && groups.map((group, index) => {
                        return <li key={group.id} className="group-list-item" data-group-id={group.id}>
                            <GroupPreview
                                index={index}
                                group={group}
                                boardId={boardId}
                                labels={labels}
                                cmpsOrder={cmpsOrder}
                                priorities={priorities}
                                key={`group-preview-${group.id}`} />
                        </li>
                    })}
                    {provided.placeholder}
                </ul >
            )}
        </Droppable>

        <Button
            onClick={() => { addGroup(boardId) }}
            kind="secondary"
            size="small"
            leftIcon={Add}>
            Add new group
        </Button>

    </div >
}

