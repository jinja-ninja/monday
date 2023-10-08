import { useEffect, useState } from "react"
import { Button, IconButton, Loader, MenuItem, SplitButton, SplitButtonMenu, Search as SearchInput } from "monday-ui-react-core"
import { Add, Announcement, Check, Filter, Hide, Menu, PersonRound, Search, Sort } from "monday-ui-react-core/icons"
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader"
import { GroupList } from "../cmps/GroupList"
import { BoardMainHeader } from "../cmps/BoardMainHeader"
import { SideBar } from "../cmps/SideBar"
import { Outlet, useParams } from "react-router-dom"
import { getBoardById, updateBoard } from "../store/actions/board.action"
import { useSelector } from "react-redux"
import { UserMsg } from "../cmps/UserMsg"
import MondayLoader from '../assets/Loader/MondayLoader.gif'
import { SelectedModal } from "../cmps/selectedModal"

export function BoardDetails() {
    const params = useParams()
    const currBoard = useSelector(state => state.boardModule.board)
    const selectedTasks = useSelector(state => state.boardModule.selectedTasks)
    const [isSearch, setIsSearch] = useState(false)

    useEffect(() => {
        loadBoard()
    }, [params.boardId])

    async function loadBoard() {
        await getBoardById(params.boardId)
    }
    function toggleIsSearch() {
        setIsSearch((prevIsSearch) => !prevIsSearch)
    }

    const cmpsOrder = [
        "side",
        "title",
        "status",
        "priority",
        "memberIds",
        "dueDate"
    ]
    const dynSearchBtnInput = isSearch ?
        // width 265px
        <SearchInput
        className="search-input"
            onBlur={() => toggleIsSearch()}
            autoFocus
            iconName={Search}
            placeholder="Search"
            size="small"
            wrapperClassName="monday-storybook-search_size"
        /> :
        <Button
            onClick={() => toggleIsSearch()}
            leftIcon={Search}
            kind="tertiary"
            size="small">Search
        </Button>

    const progress = [null, null, "status", null, "priority", null]

    if (!currBoard) return <div className="monday-loader-container"><img src={MondayLoader} alt="" /></div>
    return <main className="board-details-layout">
        <BoardMainHeader />
        <SideBar />

        <section className="board-details-container">
            <UserMsg />

            <BoardDetailsHeader title={currBoard.title} boardId={currBoard._id} />

            <div className="board-details-actions">

                <SplitButton size="small" secondaryDialogContent={<SplitButtonMenu _id="split-menu">
                    <MenuItem icon={Check} title="Hey" />
                    <MenuItem icon={Announcement} title="There" />
                </SplitButtonMenu>}>
                    New Task
                </SplitButton>

                {/* <Button leftIcon={Search} kind="tertiary" size="small">Search</Button> */}
                {dynSearchBtnInput}
                <Button leftIcon={PersonRound} kind="tertiary" size="small">Person</Button>

                <SplitButton kind="tertiary" leftIcon={Filter} size="small" secondaryDialogContent={
                    <SplitButtonMenu _id="split-menu">
                        <MenuItem icon={Check} title="Hey" />
                        <MenuItem icon={Announcement} title="There" />
                    </SplitButtonMenu>}>
                    Filter
                </SplitButton>

                <Button leftIcon={Sort} kind="tertiary" size="small">Sort</Button>
                <Button leftIcon={Hide} kind="tertiary" size="small">Hide</Button>

                <IconButton icon={Menu} size="small" />
            </div>

            <GroupList
                boardId={params.boardId}
                groups={currBoard.groups}
                labels={currBoard.labels}
                cmpsOrder={cmpsOrder}
                progress={progress}
                priorities={currBoard.priorities}
            />

            <Outlet />

            {selectedTasks.length > 0 && < SelectedModal selectedTasks={selectedTasks} currBoard={currBoard} />}

        </section>
    </main >
}