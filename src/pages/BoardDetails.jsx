import { useEffect, useState } from "react";
import { Button, IconButton, MenuItem, SplitButton, SplitButtonMenu } from "monday-ui-react-core";
import { Add, Announcement, Check, Filter, Hide, Menu, PersonRound, Search, Sort } from "monday-ui-react-core/icons";
import { BoardDetailsHeader } from "../cmps/BoardDetailsHeader";
import { GroupList } from "../cmps/GroupList";
import { BoardMainHeader } from "../cmps/BoardMainHeader";
import { SideBar } from "../cmps/SideBar";
import { useParams } from "react-router-dom";
import { getBoardById } from "../store/actions/board.action";
import { useSelector } from "react-redux";

export function BoardDetails() {
    const params = useParams()
    // const board = useSelector(state => state.boardModule.board)

    const [board, setBoard] = useState(null)

    useEffect(() => {
        getBoardById(params.boardId)
            .then(board => setBoard(board))
            .catch(err => console.log('err from board details:', err))
        // setBoard(getBoardById(params.boardId))
    }, [params.boardId])
    // console.log('board from details after useeffect:', board)

    const cmpOrder = [
        "side",
        "taskTitle",
        "status",
        "priority",
        "members",
        "date"
    ];

    const progress = [null, null, "status", null, "priority", null]

    if (!board) return (<div>Loading...</div>)

    return <main className="board-details-layout">
        <BoardMainHeader />
        <SideBar />

        <section className="board-details-container">

            <BoardDetailsHeader title={board.title} />

            <div className="board-details-actions">

                <SplitButton size="small" secondaryDialogContent={<SplitButtonMenu _id="split-menu">
                    <MenuItem icon={Check} title="Hey" />
                    <MenuItem icon={Announcement} title="There" />
                </SplitButtonMenu>}>
                    New Task
                </SplitButton>

                <Button leftIcon={Search} kind="tertiary" size="small">Search</Button>
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

            <GroupList groups={board.groups}
                labels={board.labels}
                cmpOrder={cmpOrder}
                progress={progress}
            />

        </section>
    </main >
}