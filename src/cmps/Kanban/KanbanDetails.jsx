import { useParams } from "react-router-dom"
import { BoardMainHeader } from "../BoardMainHeader"
import { SideBar } from "../SideBar"
import { UserMsg } from "../UserMsg"
import { useSelector } from "react-redux"
import { loadBoard } from "../../store/actions/board.action"
import { useEffect, useState } from "react"
import { BoardDetailsHeader } from "../BoardDetailsHeader"
import MondayLoader from '../../assets/Loader/MondayLoader.gif'
import { BoardDescriptionModal } from "../BoardDescriptionModal"
import { Announcement, Check, Filter, Group, Sort } from "monday-ui-react-core/icons"
import { Button, MenuItem, SplitButton, SplitButtonMenu } from "monday-ui-react-core"
import { KanbanGroupList } from "./KanbanGroupList"


export function KanbanDetails() {
    const [isBoardDesc, setIsBoardDesc] = useState(false)
    const params = useParams()
    const currBoard = useSelector(state => state.boardModule.board)

    useEffect(() => {
        loadBoard(params.boardId)
    }, [params.boardId])
    // }, [params.boardId, filterBy, sortBy])

    function getAllBoardTasks() {
        let allTasks = currBoard.groups.reduce((accumulator, group) => {
            return accumulator.concat(group.tasks.map(task => ({
                ...task,
                groupId: group.id
            })))
        }, [])
        return allTasks
    }


    function getKanbanGroups() {
        let allTasks = getAllBoardTasks();
        let groups = allTasks.reduce((acc, task) => {
            const status = task.status || 'Blank'

            if (!acc[status]) {
                acc[status] = { name: status, tasks: [] }
            }

            acc[status].tasks.push(task)
            return acc
        }, {})

        let kanbanGroups = Object.values(groups)
        console.log('kanbanGroups:', kanbanGroups)
        return kanbanGroups
    }

    if (currBoard === null) return <div className="monday-loader-container"><img src={MondayLoader} alt="" /></div>
    return (
        <main className="board-details-layout">
            <BoardMainHeader />
            <SideBar />

            <div className="kanban-details-container">
                <UserMsg />

                <BoardDetailsHeader isStarred={currBoard.isStarred} title={currBoard.title} boardId={currBoard._id} setIsBoardDesc={setIsBoardDesc} />

                <div className="board-details-actions">

                    <SplitButton shouldCloseOnClickInsideDialog onClick={() => console.log('clicked:')} size="small" secondaryDialogContent={<SplitButtonMenu _id="split-menu">
                        <MenuItem onClick={() => console.log('clicked:')} icon={Group} title="New group of items" />
                    </SplitButtonMenu>}>
                        New Task
                    </SplitButton>
                    {/* 
            {dynSearchBtnInput} */}

                    {/* <PersonBtn
                setPersonPickerOpen={setPersonPickerOpen}
                onTogglePersonModal={onTogglePersonModal}
                onRemovePersonFilter={onRemovePersonFilter}
                personPickerOpen={personPickerOpen}
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                currBoard={currBoard}
            /> */}


                    <Button
                        // className={"btn-sortby " + (sortBy ? 'sorted' : '')}
                        // onClick={() => setSortBy(!sortBy)}
                        leftIcon={Sort}
                        kind="tertiary"
                        size="small">
                        Sort
                    </Button>
                </div>


                <KanbanGroupList getKanbanGroups={getKanbanGroups} labels={currBoard.labels} currBoard={currBoard} />

            </div>

            {isBoardDesc && <BoardDescriptionModal boardTitle={currBoard.title} setIsBoardDesc={setIsBoardDesc} />}

        </main>
    )
}