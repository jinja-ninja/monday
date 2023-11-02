import { Button } from "monday-ui-react-core"
import { GroupPreview } from "./GroupPreview"
import { Add } from "monday-ui-react-core/icons"
import { addGroup } from "../store/actions/board.action"
import { Droppable } from "react-beautiful-dnd"

export function GroupList({ groups, labels, cmpsOrder, boardId, priorities, hiddenColumns,isCollapse }) {

    let filteredCmpOrder = cmpsOrder.filter(cmp => !hiddenColumns.map(str => str.toLowerCase()).includes(cmp.toLowerCase()))


    return (
        <section className="groups-section">
            {/* <div className="side-spacing-div"></div> */}
            <div className="group-list-container">

                <Droppable droppableId="groups" type="groups">
                    {(provided, snapshot) => (
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
                                        cmpsOrder={filteredCmpOrder}
                                        priorities={priorities}
                                        collapseAll={snapshot.isDraggingOver}
                                        hiddenColumns={hiddenColumns}
                                        isCollapse={isCollapse}
                                        key={`group-preview-${group.id}`} />
                                </li>
                            })}
                            {provided.placeholder}
                        </ul >
                    )}
                </Droppable>

                {groups.length !== 0 && <Button
                    onClick={() => { addGroup(boardId) }}
                    kind="secondary"
                    size="small"
                    className="btn-add-group"
                    leftIcon={Add}>
                    Add new group
                </Button>}


            </div >
        </section>
    )
}

